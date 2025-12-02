import React, { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

type CustomerRecord = {
  id: string;
  name?: string;
  company?: string;
  email?: string;
  stripeCustomerId?: string;
  createdAt?: Date | null;
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

const CustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<CustomerRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const customersRef = collection(db, "customers");

        // Sorter nyeste kunder øverst hvis createdAt finnes
        const q = query(customersRef, orderBy("createdAt", "desc"));

        const snap = await getDocs(q);

        const items: CustomerRecord[] = snap.docs.map((docSnap) => {
          const data: any = docSnap.data();

          let createdAt: Date | null = null;
          const ts = data.createdAt;
          if (ts && typeof ts.toDate === "function") {
            createdAt = ts.toDate();
          }

          return {
            id: docSnap.id,
            name:
              data.name ??
              data.customerName ??
              data.fullName ??
              undefined,
            company:
              data.company ??
              data.companyName ??
              data.organization ??
              undefined,
            email: data.email ?? data.customerEmail ?? undefined,
            stripeCustomerId:
              data.stripeCustomerId ??
              data.stripeId ??
              data.stripeCustomer ??
              undefined,
            createdAt,
          };
        });

        setCustomers(items);
      } catch (err: any) {
        console.error("Feil ved henting av kunder:", err);
        setError(
          err?.message ||
            "Det oppsto en feil ved henting av kundedata fra Firestore."
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
        <h1>Kunder</h1>
        <p className="admin-subtitle">
          Oversikt over registrerte kunder i systemet. Dataene hentes fra{" "}
          <code>customers</code>-samlingen i Firestore og kan senere brukes som
          grunnlag for lisensoppfølging, eksport og videre CRM-funksjoner.
        </p>
      </section>

      {loading && <p>Laster kunder…</p>}
      {error && <p className="form-error">{error}</p>}

      {!loading && !error && (
        <section className="admin-table-section">
          {customers.length === 0 ? (
            <p>Ingen kunder funnet.</p>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Navn</th>
                    <th>Firma</th>
                    <th>E-post</th>
                    <th>Opprettet</th>
                    <th>Stripe-kunde</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((c) => (
                    <tr key={c.id}>
                      <td>{c.name || "–"}</td>
                      <td>{c.company || "–"}</td>
                      <td>{c.email || "–"}</td>
                      <td>{formatDate(c.createdAt)}</td>
                      <td>{c.stripeCustomerId || "–"}</td>
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

export default CustomersPage;
