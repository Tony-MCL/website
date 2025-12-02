// src/components/LicensePurchaseModal.tsx
import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

type LicensePurchaseModalProps = {
  productId: string;
  productName: string;
  isOpen: boolean;
  onClose: () => void;
};

type CustomerType = "private" | "business";
type BillingPeriod = "month" | "year";

const LicensePurchaseModal: React.FC<LicensePurchaseModalProps> = ({
  productId,
  productName,
  isOpen,
  onClose,
}) => {
  const [customerType, setCustomerType] = useState<CustomerType>("private");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [orgNumber, setOrgNumber] = useState("");
  const [country, setCountry] = useState("Norge");

  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod | null>(
    "month"
  );
  const [oneTimePurchase, setOneTimePurchase] = useState(false);

  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacyAndWaiver, setAcceptPrivacyAndWaiver] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const workerUrl = import.meta.env.VITE_STRIPE_WORKER_URL as
    | string
    | undefined;

  if (!isOpen) return null;

  const autoRenew = !oneTimePurchase;

  const validate = () => {
    if (!name.trim()) {
      return "Navn må fylles ut.";
    }
    if (!email.trim()) {
      return "E-post må fylles ut.";
    }
    if (!billingPeriod) {
      return "Velg lisensperiode (måned/år).";
    }

    if (customerType === "business") {
      if (!companyName.trim() && !orgNumber.trim()) {
        return "For bedrifter må minst enten selskapsnavn eller organisasjonsnummer fylles ut.";
      }
    }

    if (!acceptTerms) {
      return "Du må bekrefte at du har lest og akseptert Kjøpsvilkår og Brukervilkår.";
    }
    if (!acceptPrivacyAndWaiver) {
      return "Du må samtykke til personvern og bekrefte at angreretten bortfaller når lisensen aktiveres.";
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!workerUrl) {
      setError(
        "Stripe-innstillinger mangler (VITE_STRIPE_WORKER_URL). Kontakt utvikler før denne tas i bruk."
      );
      return;
    }

    if (!billingPeriod) {
      setError("Lisensperiode mangler.");
      return;
    }

    setSubmitting(true);

    try {
      // 1) Lagre kundedata til Firestore (customers)
      await addDoc(collection(db, "customers"), {
        type: customerType,
        name: name.trim(),
        email: email.trim(),
        companyName:
          customerType === "business" ? companyName.trim() || null : null,
        orgNumber:
          customerType === "business" ? orgNumber.trim() || null : null,
        country: country.trim() || null,
        product: productId,
        productName,
        billingPeriod,
        billingModel: oneTimePurchase ? "one_time" : "subscription",
        autoRenew,
        acceptTerms,
        acceptPrivacyAndWaiver,
        marketingOptIn,
        createdAt: serverTimestamp(),
        source: "website-formelsamling",
      });

      // 2) Opprett Stripe Checkout-session via worker
      const response = await fetch(workerUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: productId,
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
          `Feil fra Stripe-worker (${response.status}): ${text || "ukjent feil"}`
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
      const msg =
        err?.message ||
        "Noe gikk galt ved lagring eller kommunikasjon med Stripe. Prøv igjen eller kontakt support.";
      setError(msg);
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-modal-backdrop" role="dialog" aria-modal="true">
      <div className="admin-modal">
        <h2>Kjøp lisens – {productName}</h2>

        <p className="form-info" style={{ marginTop: 0 }}>
          Fyll inn kundedetaljer, velg lisensperiode og bekreft vilkår før du
          går videre til betaling. Selve betalingen håndteres sikkert av
          Stripe.
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
                  <strong>Månedlig lisens</strong> — NOK 49,- / ca €4,50 per
                  måned
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
                  <strong>Årlig lisens</strong> — NOK 490,- / ca €45 per år
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
                  Jeg ønsker{" "}
                  <strong>engangskjøp uten videre abonnement</strong> for valgt
                  periode.
                  <br />
                  <span style={{ color: "var(--mcl-text-dim)" }}>
                    Når denne er avhaket, settes lisensen opp som
                    engangskjøp. Uten hake blir lisensen et løpende
                    abonnement som kan sies opp.
                  </span>
                </span>
              </div>
            </label>
          </div>

          {/* Samtykker */}
          <div className="form-row">
            <label>
              <span>Samtykker <span className="required">*</span></span>
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
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    style={{ marginTop: "0.1rem" }}
                  />
                  <span>
                    Jeg har lest og aksepterer{" "}
                    <strong>Kjøpsvilkår</strong> og{" "}
                    <strong>Brukervilkår</strong> for digitale produkter fra
                    Mathisens Morning Coffee Labs.
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
                    checked={acceptPrivacyAndWaiver}
                    onChange={(e) =>
                      setAcceptPrivacyAndWaiver(e.target.checked)
                    }
                    style={{ marginTop: "0.1rem" }}
                  />
                  <span>
                    Jeg samtykker til behandling av personopplysninger i tråd
                    med <strong>Personvernerklæringen</strong>, og ber om at
                    leveringen av det digitale innholdet starter umiddelbart.
                    Jeg er kjent med at <strong>angreretten bortfaller</strong>{" "}
                    når lisensen er aktivert.
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
                (full juridisk informasjon, organisasjonsnummer og
                kontaktopplysninger kan fylles inn her før lansering)
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
              className="admin-danger-button"
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

export default LicensePurchaseModal;
