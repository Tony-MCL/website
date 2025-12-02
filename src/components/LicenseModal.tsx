import React, { useState } from "react";
import CheckoutButton from "./CheckoutButton";

type LicenseModalProps = {
  open: boolean;
  onClose: () => void;
  product: string;
  productName: string;
};

const NOK_PRICES = {
  monthly: 49,
  yearly: 490,
};

const EUR_PRICES = {
  monthly: 4.5,
  yearly: 45,
};

const LicenseModal: React.FC<LicenseModalProps> = ({
  open,
  onClose,
  product,
  productName,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<"month" | "year" | null>(
    null
  );
  const [isOneTime, setIsOneTime] = useState(false);

  const [checkedTerms, setCheckedTerms] = useState(false);
  const [checkedDelivery, setCheckedDelivery] = useState(false);
  const [checkedPrivacy, setCheckedPrivacy] = useState(false);
  const [checkedSubscription, setCheckedSubscription] = useState(false);

  if (!open) return null;

  const disableCheckout =
    !selectedPeriod ||
    !checkedTerms ||
    !checkedDelivery ||
    !checkedPrivacy ||
    (!isOneTime && !checkedSubscription);

  const handleBackdropClick = () => {
    onClose();
  };

  const handleInnerClick: React.MouseEventHandler<HTMLDivElement> = (e) =>
    e.stopPropagation();

  const renderSelectedText = () => {
    if (!selectedPeriod) return "Velg først periode og type lisens.";

    if (selectedPeriod === "month" && !isOneTime) {
      return `Abonnement – månedlig · NOK ${NOK_PRICES.monthly},- / mnd · €${EUR_PRICES.monthly} / mnd`;
    }
    if (selectedPeriod === "year" && !isOneTime) {
      return `Abonnement – årlig · NOK ${NOK_PRICES.yearly},- / år · €${EUR_PRICES.yearly} / år`;
    }
    if (selectedPeriod === "month" && isOneTime) {
      return `Engangslisens – 1 mnd · NOK ${NOK_PRICES.monthly},- · €${EUR_PRICES.monthly}`;
    }
    if (selectedPeriod === "year" && isOneTime) {
      return `Engangslisens – 1 år · NOK ${NOK_PRICES.yearly},- · €${EUR_PRICES.yearly}`;
    }
    return "";
  };

  return (
    <div className="admin-modal-backdrop" onClick={handleBackdropClick}>
      <div className="admin-modal" onClick={handleInnerClick}>
        <h2>Kjøp lisens – {productName}</h2>

        <p style={{ marginBottom: "1rem" }}>
          Under velger du lisensmodell. Betalingen fullføres via Stripe, og
          lisensen aktiveres automatisk når du sendes tilbake til nettsiden.
        </p>

        {/* --- PERIODEVALG: KUN TO BOKSER --- */}
        <div
          className="fs-license-grid"
          style={{
            marginBottom: "1rem",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          }}
        >
          {/* Abonnement / periode – vi bruker samme kortstil */}
          <button
            type="button"
            className={`fs-license-card ${
              selectedPeriod === "month" ? "active" : ""
            }`}
            onClick={() => setSelectedPeriod("month")}
          >
            <div className="fs-license-label">Månedlig</div>
            <p>
              NOK {NOK_PRICES.monthly},- / mnd
              <br />€{EUR_PRICES.monthly} / mnd
            </p>
          </button>

          <button
            type="button"
            className={`fs-license-card ${
              selectedPeriod === "year" ? "active" : ""
            }`}
            onClick={() => setSelectedPeriod("year")}
          >
            <div className="fs-license-label">Årlig</div>
            <p>
              NOK {NOK_PRICES.yearly},- / år
              <br />€{EUR_PRICES.yearly} / år
            </p>
          </button>
        </div>

        {/* --- ENGANG / ABONNEMENT-VALG I EN BRED BOKS --- */}
        <div
          className="fs-license-card"
          style={{
            marginBottom: "1rem",
            width: "100%",
          }}
        >
          <div className="fs-license-label">Type lisens</div>
          <p style={{ marginBottom: "0.6rem" }}>
            Velg om lisensen skal fornyes automatisk (abonnement), eller om du
            ønsker en tidsbegrenset engangslisens uten videre trekk.
          </p>
          <label
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "0.5rem",
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={isOneTime}
              onChange={(e) => setIsOneTime(e.target.checked)}
              style={{ marginTop: "0.18rem" }}
            />
            <span>
              Kjøp som <strong>engangslisens</strong> (ingen automatisk
              fornyelse). Når perioden er over, må du selv kjøpe ny lisens hvis
              du vil fortsette å bruke PRO-funksjonene.
            </span>
          </label>
          {!isOneTime && (
            <p style={{ marginTop: "0.6rem", fontSize: "0.85rem" }}>
              Uten avhuking kjøpes lisensen som <strong>abonnement</strong> med
              automatisk fornyelse i valgt periode.
            </p>
          )}
        </div>

        {/* --- VALGT MODELL-TEKST --- */}
        <p style={{ marginBottom: "1rem", fontSize: "0.9rem" }}>
          <strong>Valgt modell:</strong> {renderSelectedText()}
        </p>

        {/* --- JURIDISKE GODKJENNINGER --- */}
        <div className="fs-checklist">
          <div className="fs-checkitem">
            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.5rem",
                fontSize: "0.9rem",
              }}
            >
              <input
                type="checkbox"
                checked={checkedTerms}
                onChange={(e) => setCheckedTerms(e.target.checked)}
                style={{ marginTop: "0.18rem" }}
              />
              <span>
                Jeg bekrefter at jeg har lest og forstått kjøpsvilkårene.
              </span>
            </label>
          </div>

          <div className="fs-checkitem">
            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.5rem",
                fontSize: "0.9rem",
              }}
            >
              <input
                type="checkbox"
                checked={checkedDelivery}
                onChange={(e) => setCheckedDelivery(e.target.checked)}
                style={{ marginTop: "0.18rem" }}
              />
              <span>
                Jeg samtykker til umiddelbar levering og forstår at angreretten
                da bortfaller (Angrerettloven §22 n / EU Digital Content
                Directive).
              </span>
            </label>
          </div>

          <div className="fs-checkitem">
            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.5rem",
                fontSize: "0.9rem",
              }}
            >
              <input
                type="checkbox"
                checked={checkedPrivacy}
                onChange={(e) => setCheckedPrivacy(e.target.checked)}
                style={{ marginTop: "0.18rem" }}
              />
              <span>
                Jeg godtar personvernerklæringen og at Stripe behandler
                betalingsinformasjonen min på vegne av Mathisens Morning Coffee
                Labs.
              </span>
            </label>
          </div>

          {!isOneTime && (
            <div className="fs-checkitem">
              <label
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.5rem",
                  fontSize: "0.9rem",
                }}
              >
                <input
                  type="checkbox"
                  checked={checkedSubscription}
                  onChange={(e) =>
                    setCheckedSubscription(e.target.checked)
                  }
                  style={{ marginTop: "0.18rem" }}
                />
                <span>
                  Jeg godtar vilkårene for abonnement, inkludert automatisk
                  fornyelse til oppgitt pris og intervall, inntil jeg selv
                  avslutter abonnementet.
                </span>
              </label>
            </div>
          )}
        </div>

        {/* --- HANDLINGER --- */}
        <div
          className="admin-modal-actions"
          style={{ marginTop: "1.5rem", display: "flex", gap: "0.7rem" }}
        >
          {disableCheckout ? (
            <button className="checkout-button disabled" disabled>
              Fullfør betaling
            </button>
          ) : (
            <CheckoutButton
              product={product}
              billingPeriod={selectedPeriod!}
              autoRenew={!isOneTime}
              label="Fullfør betaling"
            />
          )}

          <button
            type="button"
            className="admin-secondary-button"
            onClick={onClose}
          >
            Avbryt
          </button>
        </div>
      </div>
    </div>
  );
};

export default LicenseModal;
