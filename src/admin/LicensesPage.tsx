import React, { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

type LicenseRecord = {
  id: string;
  product?: string;
  productName?: string;
  customerEmail?: string;
  customerName?: string;
  status?: string;
  billingPeriod?: string;
  billingModel?: string;
  autoRenew?: boolean;
  createdAt?: Date | null;
  expiresAt?: Date | null;
};

const formatDate = (date?: Date | null) => {
  if (!date) return "-";
  return date.toLocaleDateString("nb-NO", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

const LicensesPage: React.FC = () => {
  const [licenses, setLicenses] = useState<LicenseRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const q = query(
          collection(db, "licenses"),
          orderBy("createdAt", "desc")
        );
        const snap = await getDocs(q);
        const items: LicenseRecord[] = snap.docs.map((doc) => {
          const data: any = doc.data();
          return {
            id: doc.id,
            product: data.product ?? data.productId ?? undefined,
            productName: data.productName ?? undefined,
            customerEmail: data.customerEmail ?? undefined,
            customerName: data.customerName ?? undefined,
            status: data.status ?? undefined,
            billingPeriod: data.billingPeriod ?? undefined,
            billingModel: data.billingModel ?? undefined,
            autoRenew: data.autoRenew ?? undefined,
            createdAt: data.createdAt?.toDate
              ? data.createdAt.toDate()
              : null,
            expiresAt: data.expiresAt?.toDate
              ? data.expiresAt.toDate()
              : null,
          };
        });
        setLicenses(items);
        setLoading(false);
      } catch (err: any) {
        console.error("Feil ved henting av lisenser:", err);
        setError(
          err?.message ||
            "Det oppsto en feil ved henting av lisensdata fra Firestore."
        );
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <main className="page admin-page">
      <section className="admin-header">
        <h1>Lisenser</h1>
        <p className="admin-subtitle">
          Oversikt over registrerte lisenser i systemet. Dataene hentes fra
          Firestore og kan senere brukes som grunnlag for mer detaljert
          rapportering og eksport.
        </p>
      </section>

      {loading && <p>Laster lisenser…</p>}
      {error && <p className="form-error">{error}</p>}

      {!loading && !error && (
        <section className="admin-table-section">
          {licenses.length === 0 ? (
            <p>Ingen lisenser funnet.</p>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Produkt</th>
                    <th>Kunde</th>
                    <th>E-post</th>
                    <th>Modell</th>
                    <th>Status</th>
                    <th>Opprettet</th>
                    <th>Utløper</th>
                  </tr>
                </thead>
                <tbody>
                  {licenses.map((lic) => (
                    <tr key={lic.id}>
                      <td>
                        {lic.productName || lic.product || "-"}
                      </td>
                      <td>{lic.customerName || "-"}</td>
                      <td>{lic.customerEmail || "-"}</td>
                      <td>
                        {lic.billingModel === "one_time"
                          ? "Engang"
                          : lic.billingModel === "subscription"
                          ? "Abonnement"
                          : "-"}
                        {lic.billingPeriod
                          ? ` (${lic.billingPeriod === "year" ? "år" : "mnd"})`
                          : ""}
                        {lic.autoRenew === false && lic.billingModel === "subscription"
                          ? " · autoRenew=av"
                          : ""}
                      </td>
                      <td>{lic.status || "-"}</td>
                      <td>{formatDate(lic.createdAt)}</td>
                      <td>{formatDate(lic.expiresAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}
    </main>
  );
};

export default LicensesPage;
