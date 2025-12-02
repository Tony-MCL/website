import React, { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

type LicenseType = "trial" | "paid" | null;

type LicenseRecord = {
  id: string;
  productId?: string;
  productName?: string;
  customerEmail?: string;
  customerName?: string;
  status?: string;
  billingPeriod?: string;
  billingModel?: string;
  autoRenew?: boolean;
  createdAt?: Date | null;
  expiresAt?: Date | null;
  licenseType: LicenseType;
};

const formatDate = (date?: Date | null) => {
  if (!date) return "-";
  try {
    return date.toLocaleDateString("nb-NO", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  } catch {
    return date.toString();
  }
};

const LicensesPage: React.FC = () => {
  const [licenses, setLicenses] = useState<LicenseRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const licensesRef = collection(db, "licenses");
        const q = query(licensesRef, orderBy("createdAt", "desc"));
        const snap = await getDocs(q);

        const items: LicenseRecord[] = snap.docs.map((docSnap) => {
          const data: any = docSnap.data();

          let createdAt: Date | null = null;
          if (data.createdAt && typeof data.createdAt.toDate === "function") {
            createdAt = data.createdAt.toDate();
          }

          let expiresAt: Date | null = null;
          const rawExpiry = data.expiresAt || data.expires || data.validUntil;
          if (rawExpiry && typeof rawExpiry.toDate === "function") {
            expiresAt = rawExpiry.toDate();
          }

          // Samme logikk som på Dashboard: licenseType / isTrial
          let licenseType: LicenseType = null;
          if (data.licenseType === "trial" || data.licenseType === "paid") {
            licenseType = data.licenseType;
          } else if (data.isTrial === true) {
            licenseType = "trial";
          } else if (data.isTrial === false) {
            licenseType = "paid";
          }

          return {
            id: docSnap.id,
            productId: data.productId ?? data.product ?? undefined,
            productName: data.productName ?? undefined,
            customerEmail: data.customerEmail ?? data.email ?? undefined,
            customerName: data.customerName ?? data.name ?? undefined,
            status:
              data.status ??
              (licenseType === "trial"
                ? "Prøveperiode"
                : licenseType === "paid"
                ? "Betalt"
                : undefined),
            billingPeriod: data.billingPeriod ?? undefined,
            billingModel: data.billingModel ?? undefined,
            autoRenew:
              typeof data.autoRenew === "boolean"
                ? data.autoRenew
                : typeof data.cancelAtPeriodEnd === "boolean"
                ? !data.cancelAtPeriodEnd
                : undefined,
            createdAt,
            expiresAt,
            licenseType,
          };
        });

        setLicenses(items);
      } catch (err: any) {
        console.error("Feil ved henting av lisenser:", err);
        setError(
          err?.message ||
            "Det oppsto en feil ved henting av lisensdata fra Firestore."
        );
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <main className="page admin-page">
      <section className="admin-header">
        <h1>Lisenser</h1>
        <p>
          Oversikt over både gratis prøvelisenser og betalte lisenser fra{" "}
          <code>licenses</code>-samlingen. Formelsamlingen oppretter disse
          dokumentene automatisk når brukere starter prøveperiode eller
          fullfører kjøp.
        </p>
      </section>

      {error && <p className="admin-error">{error}</p>}

      {loading && <p>Laster lisenser…</p>}

      {!loading && !error && (
        <section className="admin-sub-section">
          {licenses.length === 0 ? (
            <p className="admin-empty">
              Ingen lisenser funnet ennå. Når noen starter en gratis prøve eller
              fullfører et kjøp, dukker lisensen opp her.
            </p>
          ) : (
            <div className="admin-table-section">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Produkt</th>
                    <th>Kunde</th>
                    <th>E-post</th>
                    <th>Modell</th>
                    <th>Status</th>
                    <th>Opprettet</th>
                    <th>Gyldig til</th>
                  </tr>
                </thead>
                <tbody>
                  {licenses.map((lic) => (
                    <tr key={lic.id}>
                      <td>
                        {lic.licenseType === "trial" && (
                          <span className="license-badge license-badge-trial">
                            Trial
                          </span>
                        )}
                        {lic.licenseType === "paid" && (
                          <span className="license-badge license-badge-paid">
                            Betalt
                          </span>
                        )}
                        {lic.productName || lic.productId || "-"}
                      </td>
                      <td>{lic.customerName || "-"}</td>
                      <td>{lic.customerEmail || "-"}</td>
                      <td>
                        {lic.billingModel === "one_time"
                          ? "Engangskjøp"
                          : lic.billingModel === "subscription"
                          ? lic.billingPeriod === "year"
                            ? "Abonnement (årlig)"
                            : lic.billingPeriod === "month"
                            ? "Abonnement (månedlig)"
                            : "Abonnement"
                          : lic.licenseType === "trial"
                          ? "Gratis prøve"
                          : "-"}
                      </td>
                      <td>
                        <span className="license-status">
                          {lic.status || "-"}
                        </span>
                      </td>
                      <td>{formatDate(lic.createdAt)}</td>
                      <td>
                        <span className="license-expiry">
                          {formatDate(lic.expiresAt)}
                        </span>
                      </td>
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
