import React, { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

type LicenseDoc = {
  id: string;
  email?: string | null;
  customerName?: string | null;
  product?: string | null;
  licenseType?: string | null;
  isTrial?: boolean;
  plan?: string | null;
  status?: string | null;
  createdAt?: Date | null;
  expiresAt?: Date | null;
};

const formatDateTime = (d?: Date | null) => {
  if (!d) return "—";
  try {
    return d.toLocaleString("nb-NO", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return d.toString();
  }
};

const formatDate = (d?: Date | null) => {
  if (!d) return "—";
  try {
    return d.toLocaleDateString("nb-NO", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  } catch {
    return d.toString();
  }
};

const LicensesPage: React.FC = () => {
  const [trialLicenses, setTrialLicenses] = useState<LicenseDoc[]>([]);
  const [paidLicenses, setPaidLicenses] = useState<LicenseDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const licRef = collection(db, "licenses");
        const snap = await getDocs(query(licRef, orderBy("createdAt", "desc")));

        const all: LicenseDoc[] = snap.docs.map((docSnap) => {
          const data = docSnap.data() as any;

          let createdAt: Date | null = null;
          const tsCreated = data.createdAt;
          if (tsCreated && typeof tsCreated.toDate === "function") {
            createdAt = tsCreated.toDate();
          }

          let expiresAt: Date | null = null;
          const tsExpires = data.expiresAt;
          if (tsExpires && typeof tsExpires.toDate === "function") {
            expiresAt = tsExpires.toDate();
          }

          return {
            id: docSnap.id,
            email: data.email ?? null,
            customerName: data.customerName ?? data.name ?? null,
            product: data.product ?? data.productId ?? null,
            licenseType: data.licenseType ?? null,
            isTrial: data.isTrial ?? false,
            plan: data.plan ?? data.billingPeriod ?? null,
            status: data.status ?? null,
            createdAt,
            expiresAt,
          };
        });

        const trials: LicenseDoc[] = [];
        const paid: LicenseDoc[] = [];

        all.forEach((lic) => {
          // Vi prøver flere "hint" for å avgjøre om noe er prøve
          const isTrial =
            lic.isTrial === true ||
            lic.licenseType === "trial" ||
            lic.plan === "trial";

          if (isTrial) {
            trials.push(lic);
          } else {
            paid.push(lic);
          }
        });

        setTrialLicenses(trials);
        setPaidLicenses(paid);
      } catch (err: any) {
        console.error("Feil ved henting av lisenser:", err);
        setError(
          err?.message ||
            "Kunne ikke hente lisensdata. Sjekk konsollen for detaljer."
        );
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <main className="page admin-subpage">
      <h1>Lisenser</h1>
      <p>
        Oversikt over lisenser registrert i Firestore. Lisensene er delt i
        gratis prøveperioder og betalte lisenser basert på feltene
        <code> isTrial / licenseType / plan</code>.
      </p>

      {error && <p className="admin-error">{error}</p>}

      {/* Gratis prøveperioder */}
      <section className="admin-sub-section">
        <h2>Gratis prøveperioder</h2>

        {loading && <p>Laster innhold…</p>}

        {!loading && trialLicenses.length === 0 && (
          <p className="admin-empty">Ingen prøveperioder funnet.</p>
        )}

        {!loading && trialLicenses.length > 0 && (
          <div className="admin-list">
            <div className="admin-list-header">
              <span>Startdato</span>
              <span>Kunde</span>
              <span>Produkt / plan</span>
              <span>Status / utløp</span>
            </div>
            {trialLicenses.map((lic) => (
              <div key={lic.id} className="admin-list-row">
                <span className="admin-col-date">
                  {formatDateTime(lic.createdAt)}
                </span>
                <span className="admin-col-from">
                  {lic.customerName || "Ukjent"}{" "}
                  {lic.email ? <span>· {lic.email}</span> : null}
                </span>
                <span className="admin-col-text">
                  <span className="license-badge license-badge-trial">
                    Prøve
                  </span>{" "}
                  {lic.product || "Ukjent produkt"}
                  {lic.plan ? <span> · {lic.plan}</span> : null}
                </span>
                <span className="admin-col-text">
                  {lic.status ? (
                    <span className="license-status">{lic.status}</span>
                  ) : (
                    "—"
                  )}
                  {lic.expiresAt && (
                    <span className="license-expiry">
                      {" "}
                      · Utløper {formatDate(lic.expiresAt)}
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Betalte lisenser */}
      <section className="admin-sub-section">
        <h2>Betalte lisenser</h2>

        {loading && <p>Laster innhold…</p>}

        {!loading && paidLicenses.length === 0 && (
          <p className="admin-empty">Ingen betalte lisenser registrert.</p>
        )}

        {!loading && paidLicenses.length > 0 && (
          <div className="admin-list">
            <div className="admin-list-header">
              <span>Startdato</span>
              <span>Kunde</span>
              <span>Produkt / plan</span>
              <span>Status / utløp</span>
            </div>
            {paidLicenses.map((lic) => (
              <div key={lic.id} className="admin-list-row">
                <span className="admin-col-date">
                  {formatDateTime(lic.createdAt)}
                </span>
                <span className="admin-col-from">
                  {lic.customerName || "Ukjent"}{" "}
                  {lic.email ? <span>· {lic.email}</span> : null}
                </span>
                <span className="admin-col-text">
                  <span className="license-badge license-badge-paid">
                    Betalt
                  </span>{" "}
                  {lic.product || "Ukjent produkt"}
                  {lic.plan ? <span> · {lic.plan}</span> : null}
                </span>
                <span className="admin-col-text">
                  {lic.status ? (
                    <span className="license-status">{lic.status}</span>
                  ) : (
                    "—"
                  )}
                  {lic.expiresAt && (
                    <span className="license-expiry">
                      {" "}
                      · Utløper {formatDate(lic.expiresAt)}
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default LicensesPage;
