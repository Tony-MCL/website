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

  // Kun to sjekkbokser:
  const [checkedMain, setCheckedMain] = useState(false);
  const [checkedDelivery, setCheckedDelivery] = useState(false);

  if (!open) return null;

  const disableCheckout =
    !selectedPeriod || !checkedMain || !checkedDelivery;

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

  // Tekst i boks #2 endres ut fra om det er abonnement eller engang
  const deliveryLabel = isOneTime
    ? "Jeg samtykker til umiddelbar levering og forstår at angreretten da bortfaller (Angrerettloven §22 n / EU Digital Content Directive)."
    : "Jeg samtykker til umiddelbar levering og forstår at angreretten da bortfaller (Angrerettloven §22 n / EU Digital Content Directive), og jeg godtar at lisensen fornyes automatisk med valgt periode inntil jeg selv avslutter abonnementet.";

  return (
    <div className="admin-modal-backdrop" onClick={handleBackdropClick}>
      <div className="admin-modal" onClick={handleInnerClick}>
        <h2>Kjøp lisens – {productName}</h2>

        <p style={{ marginBottom: "1rem" }}>
          Under velger du lisensmodell. Betalingen fullføres via Stripe, og
          lisensen aktiveres automatisk når du sendes tilbake til nettsiden.
        </p>

        {/* --- PERIODEVALG: TO BOKSER --- */}
        <div
          className="fs-license-grid"
          style={{
            marginBottom: "1rem",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          }}
        >
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

        {/* --- ENGANG / ABONNEMENT --- */}
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

        {/* --- VALGT MODELL --- */}
        <p style={{ marginBottom: "1rem", fontSize: "0.9rem" }}>
          <strong>Valgt modell:</strong> {renderSelectedText()}
        </p>

        {/* --- TO JURIDISKE BOKSER --- */}
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
                checked={checkedMain}
                onChange={(e) => setCheckedMain(e.target.checked)}
                style={{ marginTop: "0.18rem" }}
              />
              <span>
                Jeg bekrefter at jeg har lest og aksepterer kjøpsvilkår og
                personvernerklæring, og at Stripe behandler
                betalingsinformasjonen min på vegne av Mathisens Morning Coffee
                Labs.
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
              <span>{deliveryLabel}</span>
            </label>
          </div>
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
