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

type TrialSignupRecord = {
  id: string;
  email?: string;
  product?: string;
  source?: string;
  createdAt?: Date | null;
  startedAt?: Date | null;
  trialEndsAt?: Date | null;
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
  const [trialSignups, setTrialSignups] = useState<TrialSignupRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        // ----- Hent betalte lisenser (fra "licenses") -----
        try {
          const licensesRef = collection(db, "licenses");
          const qLic = query(licensesRef, orderBy("createdAt", "desc"));
          const licSnap = await getDocs(qLic);

          const licItems: LicenseRecord[] = licSnap.docs.map((docSnap) => {
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

          setLicenses(licItems);
        } catch (err) {
          console.warn("Klarte ikke å hente 'licenses'-samlingen:", err);
          setLicenses([]);
        }

        // ----- Hent gratis prøver (fra "trialSignups") -----
        try {
          const trialRef = collection(db, "trialSignups");
          const qTrial = query(trialRef, orderBy("createdAt", "desc"));
          const trialSnap = await getDocs(qTrial);

          const trialItems: TrialSignupRecord[] = trialSnap.docs.map(
            (docSnap) => {
              const data: any = docSnap.data();

              let createdAt: Date | null = null;
              if (
                data.createdAt &&
                typeof data.createdAt.toDate === "function"
              ) {
                createdAt = data.createdAt.toDate();
              }

              let startedAt: Date | null = null;
              if (data.startedAt) {
                if (typeof data.startedAt.toDate === "function") {
                  startedAt = data.startedAt.toDate();
                } else if (typeof data.startedAt === "string") {
                  startedAt = new Date(data.startedAt);
                }
              }

              let trialEndsAt: Date | null = null;
              if (data.trialEndsAt) {
                if (typeof data.trialEndsAt.toDate === "function") {
                  trialEndsAt = data.trialEndsAt.toDate();
                } else if (typeof data.trialEndsAt === "string") {
                  trialEndsAt = new Date(data.trialEndsAt);
                }
              }

              return {
                id: docSnap.id,
                email: data.email ?? undefined,
                product: data.product ?? undefined,
                source: data.source ?? undefined,
                createdAt,
                startedAt,
                trialEndsAt,
              };
            }
          );

          setTrialSignups(trialItems);
        } catch (err) {
          console.warn("Klarte ikke å hente 'trialSignups'-samlingen:", err);
          setTrialSignups([]);
        }
      } catch (err: any) {
        console.error("Feil ved henting av lisensdata:", err);
        setError(
          err?.message ||
            "Det oppsto en feil ved henting av lisens- og trial-data fra Firestore."
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
        <h1>Lisenser & prøvelisenser</h1>
        <p>
          Oversikt over betalte lisenser fra <code>licenses</code> og gratis
          prøveperioder fra <code>trialSignups</code>. Formelsamlingen skriver
          inn dataene automatisk når brukere starter prøve eller fullfører kjøp.
        </p>
      </section>

      {error && <p className="admin-error">{error}</p>}
      {loading && <p>Laster lisensdata…</p>}

      {!loading && !error && (
        <>
          {/* Betalte lisenser (fremtid / Stripe-integrasjon) */}
          <section className="admin-sub-section">
            <h2>Betalte lisenser</h2>
            {licenses.length === 0 ? (
              <p className="admin-empty">
                Ingen lisensdokumenter funnet i <code>licenses</code> ennå.
                Dette vil fylles opp når Stripe/Cloudflare-flyten begynner å
                skrive ferdige lisensdokumenter.
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

          {/* Gratis prøveperioder fra trialSignups */}
          <section className="admin-sub-section">
            <h2>Gratis prøveperioder (trialSignups)</h2>
            {trialSignups.length === 0 ? (
              <p className="admin-empty">
                Ingen gratis prøveperioder funnet i <code>trialSignups</code>.
                Start en prøve i Formelsamling-appen for å teste at data dukker
                opp her.
              </p>
            ) : (
              <div className="admin-table-section">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>E-post</th>
                      <th>Produkt</th>
                      <th>Kilde</th>
                      <th>Startet</th>
                      <th>Utløper</th>
                      <th>Opprettet</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trialSignups.map((t) => (
                      <tr key={t.id}>
                        <td>{t.email || "-"}</td>
                        <td>{t.product || "-"}</td>
                        <td>{t.source || "-"}</td>
                        <td>{formatDate(t.startedAt)}</td>
                        <td>{formatDate(t.trialEndsAt)}</td>
                        <td>{formatDate(t.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      )}
    </main>
  );
};

export default LicensesPage;
