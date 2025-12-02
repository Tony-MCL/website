import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

type LicenseModalProps = {
  open: boolean;
  onClose: () => void;
  product: string;      // f.eks. "formelsamling"
  productName: string;  // f.eks. "Formelsamling – MCL Edition"
};

type CustomerType = "private" | "business";
type BillingPeriod = "month" | "year";

const NOK_PRICES = {
  month: 49,
  year: 490,
};

const EUR_PRICES = {
  month: 4.5,
  year: 45,
};

const LicenseModal: React.FC<LicenseModalProps> = ({
  open,
  onClose,
  product,
  productName,
}) => {
  const [customerType, setCustomerType] = useState<CustomerType>("private");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("Norge");
  const [companyName, setCompanyName] = useState("");
  const [orgNumber, setOrgNumber] = useState("");

  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod | null>(
    "month"
  );
  const [oneTimePurchase, setOneTimePurchase] = useState(false);

  // To juridiske sjekkbokser + én valgfri for markedsføring
  const [acceptMain, setAcceptMain] = useState(false);
  const [acceptDelivery, setAcceptDelivery] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Stripe-worker URL (tilpass navnet til det du faktisk bruker i .env)
  const workerUrl = import.meta.env.VITE_STRIPE_WORKER_URL as
    | string
    | undefined;

  if (!open) return null;

  const autoRenew = !oneTimePurchase;

  const validate = () => {
    if (!name.trim()) return "Navn må fylles ut.";
    if (!email.trim()) return "E-post må fylles ut.";
    if (!billingPeriod) return "Velg lisensperiode (måned/år).";

    if (customerType === "business") {
      if (!companyName.trim() && !orgNumber.trim()) {
        return "For bedrifter bør minst enten selskapsnavn eller organisasjonsnummer fylles ut.";
      }
    }

    if (!acceptMain) {
      return "Du må bekrefte at du har lest og akseptert kjøpsvilkår, brukervilkår og personvernerklæring.";
    }
    if (!acceptDelivery) {
      return "Du må samtykke til umiddelbar levering og forstå at angreretten bortfaller når lisensen aktiveres.";
    }

    return null;
  };

  const renderSelectedSummary = () => {
    if (!billingPeriod) return "Velg først periode og type lisens.";

    const nok = NOK_PRICES[billingPeriod];
    const eur = EUR_PRICES[billingPeriod];

    if (oneTimePurchase) {
      const label = billingPeriod === "month" ? "Engangslisens – 1 mnd" : "Engangslisens – 1 år";
      return `${label} · NOK ${nok},- · ca €${eur}`;
    } else {
      const label = billingPeriod === "month" ? "Abonnement – månedlig" : "Abonnement – årlig";
      const suffix = billingPeriod === "month" ? "/ mnd" : "/ år";
      return `${label} · NOK ${nok},- ${suffix} · ca €${eur} ${suffix}`;
    }
  };

  const deliveryLabel = oneTimePurchase
    ? "Jeg samtykker til umiddelbar levering og forstår at angreretten da bortfaller (Angrerettloven §22 n / EU Digital Content Directive)."
    : "Jeg samtykker til umiddelbar levering og forstår at angreretten da bortfaller (Angrerettloven §22 n / EU Digital Content Directive), og jeg godtar at lisensen fornyes automatisk med valgt periode inntil jeg selv avslutter abonnementet.";

  const handleBackdropClick = () => {
    if (!submitting) onClose();
  };

  const handleInnerClick: React.MouseEventHandler<HTMLDivElement> = (e) =>
    e.stopPropagation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setError(null);
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!workerUrl) {
      setError(
        "Stripe-innstillinger mangler (VITE_STRIPE_WORKER_URL). Kontakt utvikler før du publiserer denne siden."
      );
      return;
    }
    if (!billingPeriod) {
      setError("Lisensperiode mangler.");
      return;
    }

    setSubmitting(true);

    try {
      // 1) Lagre kundedata i Firestore
      await addDoc(collection(db, "customers"), {
        type: customerType,
        name: name.trim(),
        email: email.trim(),
        country: country.trim() || null,
        companyName:
          customerType === "business" ? companyName.trim() || null : null,
        orgNumber:
          customerType === "business" ? orgNumber.trim() || null : null,
        product,
        productName,
        billingPeriod,
        billingModel: oneTimePurchase ? "one_time" : "subscription",
        autoRenew,
        acceptMain,
        acceptDelivery,
        marketingOptIn,
        createdAt: serverTimestamp(),
        source: "website",
      });

      // 2) Opprett Stripe Checkout-session via worker
      const response = await fetch(workerUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product,
          billingPeriod,
          autoRenew,
          customerType,
          customerEmail: email.trim(),
          customerName: name.trim(),
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(
          `Feil fra Stripe-worker (${response.status}): ${
            text || "ukjent feil"
          }`
        );
      }

      const data = await response.json();
      if (!data?.url) {
        throw new Error("Svar fra Stripe-worker mangler redirect-URL.");
      }

      // 3) Send bruker til Stripe Checkout
      window.location.href = data.url as string;
    } catch (err: any) {
      console.error("Feil ved forberedelse av lisenskjøp:", err);
      setError(
        err?.message ||
          "Noe gikk galt ved lagring eller kommunikasjon med Stripe. Prøv igjen eller kontakt support."
      );
      setSubmitting(false);
    }
  };

  return (
    <div
      className="admin-modal-backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className="admin-modal" onClick={handleInnerClick}>
        <h2>Kjøp lisens – {productName}</h2>

        <p className="form-info" style={{ marginTop: 0 }}>
          Fyll inn kundedetaljer, velg lisensmodell og bekreft vilkår. Deretter
          sendes du til Stripe for sikker betaling. Lisensen aktiveres
          automatisk når du kommer tilbake til nettsiden.
        </p>

        <form onSubmit={handleSubmit} className="form-grid">
          {/* Kundetype */}
          <div className="form-row">
            <label>
              Kundetype <span className="required">*</span>
            </label>
            <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={() => setCustomerType("private")}
                style={{
                  padding: "0.35rem 0.9rem",
                  borderRadius: 999,
                  border:
                    customerType === "private"
                      ? "1px solid var(--mcl-accent-light)"
                      : "1px solid var(--mcl-border)",
                  background:
                    customerType === "private"
                      ? "rgba(196,139,65,0.2)"
                      : "rgba(255,255,255,0.03)",
                  color: "var(--mcl-text)",
                  fontSize: "0.9rem",
                  cursor: "pointer",
                }}
              >
                Privatperson
              </button>
              <button
                type="button"
                onClick={() => setCustomerType("business")}
                style={{
                  padding: "0.35rem 0.9rem",
                  borderRadius: 999,
                  border:
                    customerType === "business"
                      ? "1px solid var(--mcl-accent-light)"
                      : "1px solid var(--mcl-border)",
                  background:
                    customerType === "business"
                      ? "rgba(196,139,65,0.2)"
                      : "rgba(255,255,255,0.03)",
                  color: "var(--mcl-text)",
                  fontSize: "0.9rem",
                  cursor: "pointer",
                }}
              >
                Bedrift
              </button>
            </div>
          </div>

          {/* Grunnleggende info */}
          <div className="form-row">
            <label>
              Navn <span className="required">*</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={
                  customerType === "private"
                    ? "Fornavn og etternavn"
                    : "Kontaktperson hos bedriften"
                }
                required
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              E-post <span className="required">*</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="din@epost.no"
                required
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Land (for fakturering)
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Norge"
              />
            </label>
          </div>

          {customerType === "business" && (
            <>
              <div className="form-row">
                <label>
                  Selskapsnavn (valgfritt, men anbefalt)
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Firmanavn AS"
                  />
                </label>
              </div>

              <div className="form-row">
                <label>
                  Organisasjonsnummer (valgfritt, men anbefalt)
                  <input
                    type="text"
                    value={orgNumber}
                    onChange={(e) => setOrgNumber(e.target.value)}
                    placeholder="Org.nr. (for eksempel 123 456 789)"
                  />
                </label>
              </div>
            </>
          )}

          {/* Lisensvalg */}
          <div className="form-row">
            <label>
              Lisensperiode <span className="required">*</span>
            </label>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.45rem",
                  fontSize: "0.92rem",
                  cursor: "pointer",
                }}
              >
                <input
                  type="radio"
                  name="billingPeriod"
                  value="month"
                  checked={billingPeriod === "month"}
                  onChange={() => setBillingPeriod("month")}
                />
                <span>
                  <strong>Månedlig lisens</strong> — NOK {NOK_PRICES.month},- /
                  ca €{EUR_PRICES.month} per måned
                  <br />
                  <span style={{ color: "var(--mcl-text-dim)" }}>
                    Fleksibel lisens for testing og mindre team.
                  </span>
                </span>
              </label>

              <label
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.45rem",
                  fontSize: "0.92rem",
                  cursor: "pointer",
                  marginTop: "0.3rem",
                }}
              >
                <input
                  type="radio"
                  name="billingPeriod"
                  value="year"
                  checked={billingPeriod === "year"}
                  onChange={() => setBillingPeriod("year")}
                />
                <span>
                  <strong>Årlig lisens</strong> — NOK {NOK_PRICES.year},- / ca €
                  {EUR_PRICES.year} per år
                  <br />
                  <span style={{ color: "var(--mcl-text-dim)" }}>
                    Redusert pris per måned for faste brukere og avdelinger.
                  </span>
                </span>
              </label>
            </div>
          </div>

          <div className="form-row">
            <label>
              Modell
              <div
                style={{
                  marginTop: "0.35rem",
                  padding: "0.6rem 0.7rem",
                  borderRadius: 10,
                  border: "1px solid var(--mcl-border)",
                  background: "rgba(255,255,255,0.02)",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.45rem",
                  fontSize: "0.9rem",
                }}
              >
                <input
                  type="checkbox"
                  checked={oneTimePurchase}
                  onChange={(e) => setOneTimePurchase(e.target.checked)}
                  style={{ marginTop: "0.15rem" }}
                />
                <span>
                  Kjøp som <strong>engangslisens</strong> (ingen automatisk
                  fornyelse). Når perioden er over, må du selv kjøpe ny lisens
                  for å fortsette å bruke PRO-funksjonene. Uten hake kjøpes
                  lisensen som <strong>abonnement</strong> med automatisk
                  fornyelse i valgt periode.
                </span>
              </div>
            </label>
          </div>

          {/* Oppsummering */}
          <div className="form-row">
            <label>
              Valgt modell
              <div
                style={{
                  marginTop: "0.35rem",
                  padding: "0.5rem 0.7rem",
                  borderRadius: 10,
                  border: "1px solid var(--mcl-border)",
                  background: "rgba(255,255,255,0.02)",
                  fontSize: "0.9rem",
                }}
              >
                {renderSelectedSummary()}
              </div>
            </label>
          </div>

          {/* Samtykker */}
          <div className="form-row">
            <label>
              Samtykker <span className="required">*</span>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.4rem",
                  marginTop: "0.4rem",
                  fontSize: "0.9rem",
                }}
              >
                <label
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.4rem",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={acceptMain}
                    onChange={(e) => setAcceptMain(e.target.checked)}
                    style={{ marginTop: "0.1rem" }}
                  />
                  <span>
                    Jeg har lest og aksepterer{" "}
                    <strong>Kjøpsvilkår</strong>,{" "}
                    <strong>Brukervilkår</strong> og{" "}
                    <strong>Personvernerklæring</strong> for digitale produkter
                    fra Mathisens Morning Coffee Labs.
                  </span>
                </label>

                <label
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.4rem",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={acceptDelivery}
                    onChange={(e) => setAcceptDelivery(e.target.checked)}
                    style={{ marginTop: "0.1rem" }}
                  />
                  <span>{deliveryLabel}</span>
                </label>

                <label
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.4rem",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={marketingOptIn}
                    onChange={(e) => setMarketingOptIn(e.target.checked)}
                    style={{ marginTop: "0.1rem" }}
                  />
                  <span>
                    (Valgfritt) Jeg ønsker å motta informasjon om nye funksjoner
                    og relaterte produkter fra Morning Coffee Labs.
                  </span>
                </label>
              </div>
            </label>
          </div>

          {/* Selgerinformasjon */}
          <div className="form-row">
            <label>
              Selger
              <div
                style={{
                  marginTop: "0.35rem",
                  padding: "0.6rem 0.7rem",
                  borderRadius: 10,
                  border: "1px solid var(--mcl-border)",
                  background: "rgba(255,255,255,0.02)",
                  fontSize: "0.85rem",
                  color: "var(--mcl-text-dim)",
                  lineHeight: 1.5,
                }}
              >
                <strong>Mathisens Morning Coffee Labs</strong>
                <br />
                Norge
                <br />
                (organisasjonsnummer og full juridisk info fylles inn før
                lansering)
              </div>
            </label>
          </div>

          {error && <p className="form-error">{error}</p>}

          <div className="admin-modal-actions" style={{ marginTop: "0.9rem" }}>
            <button
              type="button"
              className="admin-secondary-button"
              onClick={onClose}
              disabled={submitting}
            >
              Avbryt
            </button>
            <button
              type="submit"
              className="checkout-button"
              disabled={submitting}
            >
              {submitting ? "Forbereder betaling…" : "Gå til betaling"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LicenseModal;
