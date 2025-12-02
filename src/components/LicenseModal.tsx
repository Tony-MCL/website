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

const NOK_PRICES: Record<BillingPeriod, number> = {
  month: 49,
  year: 490,
};

const EUR_PRICES: Record<BillingPeriod, number> = {
  month: 4.5,
  year: 45,
};

const LicenseModal: React.FC<LicenseModalProps> = ({
  open,
  onClose,
  product,
  productName,
}) => {
  const [step, setStep] = useState<1 | 2>(1);

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

  const [acceptMain, setAcceptMain] = useState(false);
  const [acceptDelivery, setAcceptDelivery] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const workerUrl = import.meta.env.VITE_STRIPE_WORKER_URL as
    | string
    | undefined;

  if (!open) return null;

  const autoRenew = !oneTimePurchase;

  // ---------- HJELPERE ----------

  const validateStep1 = (): string | null => {
    if (!billingPeriod) return "Velg lisensperiode.";
    return null;
  };

  const validateAll = (): string | null => {
    const s1 = validateStep1();
    if (s1) return s1;

    if (!name.trim()) return "Navn må fylles ut.";
    if (!email.trim()) return "E-post må fylles ut.";

    if (customerType === "business") {
      if (!companyName.trim()) {
        return "For bedrifter må selskapsnavn fylles ut.";
      }
      if (!orgNumber.trim()) {
        return "For bedrifter må organisasjonsnummer/MVA-nummer fylles ut.";
      }
    }

    if (!acceptMain) {
      return "Du må bekrefte at du har lest og akseptert vilkår og personvernerklæring.";
    }
    if (!acceptDelivery) {
      return "Du må samtykke til umiddelbar aktivering og bortfall av angrerett.";
    }

    return null;
  };

  const renderSelectedSummary = () => {
    if (!billingPeriod) return "Ingen modell valgt.";

    const nok = NOK_PRICES[billingPeriod];
    const eur = EUR_PRICES[billingPeriod];

    if (oneTimePurchase) {
      const label =
        billingPeriod === "month" ? "Engangslisens – 1 mnd" : "Engangslisens – 1 år";
      return `${label} · NOK ${nok},- · ca €${eur}`;
    } else {
      const label =
        billingPeriod === "month" ? "Abonnement – månedlig" : "Abonnement – årlig";
      const suffix = billingPeriod === "month" ? "/ mnd" : "/ år";
      return `${label} · NOK ${nok},- ${suffix} · ca €${eur} ${suffix}`;
    }
  };

  const deliveryLabel = oneTimePurchase
    ? "Jeg samtykker til at lisensen aktiveres umiddelbart, og at angreretten da bortfaller."
    : "Jeg samtykker til at lisensen aktiveres umiddelbart, at angreretten bortfaller, og at abonnementet fornyes automatisk til jeg sier opp.";

  const handleBackdropClick = () => {
    if (!submitting) {
      setStep(1);
      setError(null);
      onClose();
    }
  };

  const handleInnerClick: React.MouseEventHandler<HTMLDivElement> = (e) =>
    e.stopPropagation();

  const handleNext = () => {
    const err = validateStep1();
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setStep(2);
  };

  const handleBack = () => {
    setError(null);
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    const validationError = validateAll();
    if (validationError) {
      setError(validationError);
      if (step === 1) setStep(2);
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
    setError(null);

    try {
      // 1) Lagre kundedata i Firestore
      await addDoc(collection(db, "customers"), {
        type: customerType,
        name: name.trim(),
        email: email.trim(),
        country: country.trim() || null,
        companyName:
          customerType === "business" ? companyName.trim() : null,
        orgNumber:
          customerType === "business" ? orgNumber.trim() : null,
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

  // ---------- RENDER ----------

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
          Steg {step} av 2 ·{" "}
          {step === 1
            ? "Velg lisensmodell."
            : "Fyll inn kundeinformasjon og bekreft vilkår."}
        </p>

        <form onSubmit={handleSubmit} className="form-grid">
          {step === 1 && (
            <>
              {/* Lisensperiode – kort-kort */}
              <div className="form-row">
                <div style={{ marginBottom: "0.4rem", fontWeight: 500 }}>
                  Lisensperiode *
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "0.75rem",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setBillingPeriod("month")}
                    style={{
                      flex: "1 1 180px",
                      minWidth: 0,
                      padding: "0.7rem 0.9rem",
                      borderRadius: 12,
                      border:
                        billingPeriod === "month"
                          ? "1px solid var(--mcl-accent-light)"
                          : "1px solid var(--mcl-border)",
                      background:
                        billingPeriod === "month"
                          ? "rgba(196,139,65,0.18)"
                          : "rgba(255,255,255,0.03)",
                      textAlign: "left",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        marginBottom: 4,
                      }}
                    >
                      Abonnement – månedlig
                    </div>
                    <div style={{ fontSize: "0.9rem" }}>
                      NOK {NOK_PRICES.month},- / ca €{EUR_PRICES.month} per mnd
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setBillingPeriod("year")}
                    style={{
                      flex: "1 1 180px",
                      minWidth: 0,
                      padding: "0.7rem 0.9rem",
                      borderRadius: 12,
                      border:
                        billingPeriod === "year"
                          ? "1px solid var(--mcl-accent-light)"
                          : "1px solid var(--mcl-border)",
                      background:
                        billingPeriod === "year"
                          ? "rgba(196,139,65,0.18)"
                          : "rgba(255,255,255,0.03)",
                      textAlign: "left",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        marginBottom: 4,
                      }}
                    >
                      Abonnement – årlig
                    </div>
                    <div style={{ fontSize: "0.9rem" }}>
                      NOK {NOK_PRICES.year},- / ca €{EUR_PRICES.year} per år
                    </div>
                  </button>
                </div>
              </div>

              {/* Modell – kort og tydelig */}
              <div className="form-row">
                <div
                  style={{
                    marginBottom: "0.35rem",
                    fontWeight: 500,
                  }}
                >
                  Modell
                </div>
                <div
                  style={{
                    padding: "0.55rem 0.7rem",
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
                    <strong>Engangslisens</strong> hvis avkrysset – ingen
                    automatisk fornyelse. Uten hake kjøpes lisensen som{" "}
                    <strong>abonnement</strong> med automatisk fornyelse.
                  </span>
                </div>
              </div>

              {/* Oppsummering */}
              <div className="form-row">
                <div style={{ marginBottom: "0.35rem", fontWeight: 500 }}>
                  Valgt modell
                </div>
                <div
                  style={{
                    padding: "0.45rem 0.7rem",
                    borderRadius: 10,
                    border: "1px solid var(--mcl-border)",
                    background: "rgba(255,255,255,0.02)",
                    fontSize: "0.9rem",
                  }}
                >
                  {renderSelectedSummary()}
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              {/* Kundetype – kun knapper */}
              <div className="form-row">
                <div
                  style={{
                    display: "flex",
                    gap: "0.6rem",
                    flexWrap: "wrap",
                    marginBottom: "0.15rem",
                  }}
                >
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
                  Navn *
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
                  E-post *
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
                      Selskapsnavn *
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Firmanavn AS"
                        required={customerType === "business"}
                      />
                    </label>
                  </div>

                  <div className="form-row">
                    <label>
                      Organisasjonsnummer / MVA-nummer *
                      <input
                        type="text"
                        value={orgNumber}
                        onChange={(e) => setOrgNumber(e.target.value)}
                        placeholder="Org.nr. (for eksempel 123 456 789)"
                        required={customerType === "business"}
                      />
                    </label>
                  </div>
                </>
              )}

              {/* Samtykker */}
              <div className="form-row">
                <div style={{ marginBottom: "0.35rem", fontWeight: 500 }}>
                  Samtykker *
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.4rem",
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
                      <a href="/kjopsvilkar" target="_blank" rel="noreferrer">
                        Kjøpsvilkår
                      </a>
                      ,{" "}
                      <a href="/brukervilkår" target="_blank" rel="noreferrer">
                        Brukervilkår
                      </a>{" "}
                      og{" "}
                      <a
                        href="/personvernerklaering"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Personvernerklæring
                      </a>
                      .
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
                      (Valgfritt) Jeg ønsker info om nye funksjoner og produkter
                      fra Morning Coffee Labs.
                    </span>
                  </label>
                </div>
              </div>

              {/* Selgerinformasjon */}
              <div className="form-row">
                <div
                  style={{
                    marginTop: "0.1rem",
                    padding: "0.6rem 0.7rem",
                    borderRadius: 10,
                    border: "1px solid var(--mcl-border)",
                    background: "rgba(255,255,255,0.02)",
                    fontSize: "0.85rem",
                    color: "var(--mcl-text-dim)",
                    lineHeight: 1.5,
                  }}
                >
                  <div
                    style={{
                      fontWeight: 600,
                      marginBottom: "0.25rem",
                      color: "var(--mcl-text)",
                    }}
                  >
                    Selgerinformasjon
                  </div>
                  <strong>Mathisens Morning Coffee Labs</strong>
                  <br />
                  Norge
                  <br />
                  (organisasjonsnummer og full juridisk info fylles inn før
                  lansering)
                </div>
              </div>
            </>
          )}

          {error && <p className="form-error">{error}</p>}

          <div className="admin-modal-actions" style={{ marginTop: "0.9rem" }}>
            <button
              type="button"
              className="admin-secondary-button"
              onClick={() => {
              setStep(1);
              setError(null);
              onClose();
            }}
              disabled={submitting}
            >
              Avbryt
            </button>

            {step === 1 && (
              <button
                type="button"
                className="checkout-button"
                onClick={handleNext}
              >
                Neste
              </button>
            )}

            {step === 2 && (
              <>
                <button
                  type="button"
                  className="admin-secondary-button"
                  onClick={handleBack}
                  disabled={submitting}
                >
                  Tilbake
                </button>
                <button
                  type="submit"
                  className="checkout-button"
                  disabled={submitting}
                >
                  {submitting ? "Forbereder betaling…" : "Gå til betaling"}
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LicenseModal;
