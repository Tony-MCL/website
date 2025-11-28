import React, { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

/**
 * Standardisert lisens-skjema vi sikter mot i Firestore (collection: licenses).
 *
 * Felter som skal brukes fremover:
 * - email, customerName, product
 * - licenseType: "trial" | "paid"
 * - billingModel: "subscription" | "one_time" | null
 * - billingPeriod: "month" | "year" | null
 * - stripePriceId, stripeCustomerId, stripeSubscriptionId
 * - status: f.eks. "active" | "expired" | "cancelled"
 * - startsAt, expiresAt, createdAt, updatedAt
 * - source: "trial-self" | "stripe-checkout" | ...
 */
type LicenseType = "trial" | "paid" | null;
type BillingModel = "subscription" | "one_time" | null;
type BillingPeriod = "month" | "year" | null;

type LicenseDoc = {
  id: string;

  email: string | null;
  customerName: string | null;
  customerId: string | null;
  product: string | null;

  licenseType: LicenseType;
  billingModel: BillingModel;
  billingPeriod: BillingPeriod;

  stripePriceId: string | null;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;

  status: string | null;

  startsAt: Date | null;
  expiresAt: Date | null;
  createdAt: Date | null;
  updatedAt: Date | null;

  source: string | null;
};

const getDate = (value: any): Date | null => {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value.toDate === "function") {
    try {
      return value.toDate();
    } catch {
      return null;
    }
  }
  return null;
};

const formatDateTime = (d?: Date | null) => {
  if (!d) return "—";
  try {
    return d.toLocaleString("nb-NO", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
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
      year: "numeric"
    });
  } catch {
    return d.toString();
  }
};

const describePlan = (
  billingModel: BillingModel,
  billingPeriod: BillingPeriod
): string => {
  if (!billingModel && !billingPeriod) return "—";

  if (billingModel === "subscription") {
    if (billingPeriod === "month") return "Abonnement · måned";
    if (billingPeriod === "year") return "Abonnement · år";
    return "Abonnement";
  }

  if (billingModel === "one_time") {
    if (billingPeriod === "month") return "Engang · måned";
    if (billingPeriod === "year") return "Engang · år";
    return "Engangskjøp";
  }

  // Fallback hvis noe annet skulle dukke opp
  if (billingPeriod === "month") return "Måned";
  if (billingPeriod === "year") return "År";

  return "—";
};

/**
 * Velger hvordan kunde skal vises i tabellen:
 * - navn + "· e-post" hvis vi har begge og de er ulike
 * - kun navn hvis vi bare har navn
 * - kun e-post hvis vi bare har e-post
 * - "Ukjent" hvis ingenting
 */
const renderCustomer = (lic: LicenseDoc) => {
  const name = lic.customerName || null;
  const email = lic.email || null;

  if (name && email && name !== email) {
    return (
      <>
        {name} <span>· {email}</span>
      </>
    );
  }
  if (name) return name;
  if (email) return email;
  return "Ukjent";
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

          // licenseType: foretrukket felt.
          // Hvis vi kun har isTrial i gamle dokumenter, mapper vi det inn her.
          let licenseType: LicenseType = null;
          if (data.licenseType === "trial" || data.licenseType === "paid") {
            licenseType = data.licenseType;
          } else if (data.isTrial === true) {
            licenseType = "trial";
          } else if (data.isTrial === false) {
            licenseType = "paid";
          }

          // billingModel + billingPeriod: bruk nye felter hvis de finnes, ellers fall back til eldre navn.
          const billingModel: BillingModel =
            data.billingModel === "subscription" ||
            data.billingModel === "one_time"
              ? data.billingModel
              : null;

          const billingPeriod: BillingPeriod =
            data.billingPeriod === "month" || data.billingPeriod === "year"
              ? data.billingPeriod
              : data.plan === "month" || data.plan === "year"
              ? data.plan
              : null;

          // Nytt: hent e-post fra customerEmail hvis den finnes (Stripe-worker),
          // ellers fall back til eldre "email".
          const email: string | null =
            data.customerEmail ?? data.email ?? null;

          // Nytt: customerId for mulig videre bruk (lookup mot customers-collection).
          const customerId: string | null = data.customerId ?? null;

          // Navn: hvis det ikke ligger i lisens-dokumentet, lar vi det være null.
          // (Kan senere hentes via customers/{customerId} om vi ønsker.)
          const customerName: string | null =
            data.customerName ?? data.name ?? null;

          return {
            id: docSnap.id,
            email,
            customerName,
            customerId,
            product: data.product ?? data.productId ?? null,

            licenseType,
            billingModel,
            billingPeriod,

            stripePriceId: data.stripePriceId ?? null,
            stripeCustomerId: data.stripeCustomerId ?? null,
            stripeSubscriptionId: data.stripeSubscriptionId ?? null,

            status: data.status ?? null,

            startsAt: getDate(data.startsAt),
            expiresAt: getDate(data.expiresAt),
            createdAt: getDate(data.createdAt),
            updatedAt: getDate(data.updatedAt),

            source: data.source ?? null
          };
        });

        const trials: LicenseDoc[] = [];
        const paid: LicenseDoc[] = [];

        all.forEach((lic) => {
          const isTrial = lic.licenseType === "trial";
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
        gratis prøveperioder og betalte lisenser basert på feltet{" "}
        <code>licenseType</code> (trial / paid). Modellen er klar for både
        prøvelisens og betalte lisenser via Stripe.
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
                  {formatDateTime(lic.startsAt || lic.createdAt)}
                </span>
                <span className="admin-col-from">{renderCustomer(lic)}</span>
                <span className="admin-col-text">
                  <span className="license-badge license-badge-trial">
                    PRØVE
                  </span>{" "}
                  {lic.product || "Ukjent produkt"}
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
                  {formatDateTime(lic.startsAt || lic.createdAt)}
                </span>
                <span className="admin-col-from">{renderCustomer(lic)}</span>
                <span className="admin-col-text">
                  <span className="license-badge license-badge-paid">
                    BETALT
                  </span>{" "}
                  {lic.product || "Ukjent produkt"}
                  {(() => {
                    const desc = describePlan(
                      lic.billingModel,
                      lic.billingPeriod
                    );
                    return desc !== "—" ? <span> · {desc}</span> : null;
                  })()}
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
