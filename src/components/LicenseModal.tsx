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
  const [checkedTerms, setCheckedTerms] = useState(false);
  const [checkedDelivery, setCheckedDelivery] = useState(false);
  const [checkedPrivacy, setCheckedPrivacy] = useState(false);
  const [checkedSubscription, setCheckedSubscription] = useState(false);

  const [selectedType, setSelectedType] = useState<
    | "monthly-sub"
    | "yearly-sub"
    | "monthly-one"
    | "yearly-one"
    | null
  >(null);

  if (!open) return null;

  const disableCheckout =
    !selectedType ||
    !checkedTerms ||
    !checkedDelivery ||
    !checkedPrivacy ||
    ((selectedType === "monthly-sub" || selectedType === "yearly-sub") &&
      !checkedSubscription);

  const handleBackdropClick = () => {
    onClose();
  };

  const handleInnerClick: React.MouseEventHandler<HTMLDivElement> = (e) =>
    e.stopPropagation();

  const renderPrices = () => {
    switch (selectedType) {
      case "monthly-sub":
        return `NOK ${NOK_PRICES.monthly},- / mnd  •  €${EUR_PRICES.monthly}`;
      case "yearly-sub":
        return `NOK ${NOK_PRICES.yearly},- / år  •  €${EUR_PRICES.yearly}`;
      case "monthly-one":
        return `NOK ${NOK_PRICES.monthly},- (1 mnd)  •  €${EUR_PRICES.monthly}`;
      case "yearly-one":
        return `NOK ${NOK_PRICES.yearly},- (1 år)  •  €${EUR_PRICES.yearly}`;
      default:
        return "Velg lisensmodell";
    }
  };

  return (
    <div className="admin-modal-backdrop" onClick={handleBackdropClick}>
      <div className="admin-modal" onClick={handleInnerClick}>
        <h2>Kjøp lisens – {productName}</h2>

        <p style={{ marginBottom: "1rem" }}>
          Under velger du lisensmodell. Betalingen fullføres via Stripe, og
          lisensen aktiveres automatisk når du sendes tilbake til nettsiden.
        </p>

        {/* --- LISENSVALG --- */}
        <div className="fs-license-grid" style={{ marginBottom: "1rem" }}>
          {/* Abonnement måned */}
          <button
            className={`fs-license-card ${
              selectedType === "monthly-sub" ? "active" : ""
            }`}
            onClick={() => setSelectedType("monthly-sub")}
          >
            <div className="fs-license-label">Abonnement – månedlig</div>
            <p>
              NOK {NOK_PRICES.monthly},- / mnd  
              <br />€{EUR_PRICES.monthly} / mnd
            </p>
          </button>

          {/* Abonnement årlig */}
          <button
            className={`fs-license-card ${
              selectedType === "yearly-sub" ? "active" : ""
            }`}
            onClick={() => setSelectedType("yearly-sub")}
          >
            <div className="fs-license-label">Abonnement – årlig</div>
            <p>
              NOK {NOK_PRICES.yearly},- / år  
              <br />€{EUR_PRICES.yearly} / år
            </p>
          </button>

          {/* Engang 1 mnd */}
          <button
            className={`fs-license-card ${
              selectedType === "monthly-one" ? "active" : ""
            }`}
            onClick={() => setSelectedType("monthly-one")}
          >
            <div className="fs-license-label">Engangslisens – 1 mnd</div>
            <p>
              NOK {NOK_PRICES.monthly},-  
              <br />€{EUR_PRICES.monthly}
            </p>
          </button>

          {/* Engang 1 år */}
          <button
            className={`fs-license-card ${
              selectedType === "yearly-one" ? "active" : ""
            }`}
            onClick={() => setSelectedType("yearly-one")}
          >
            <div className="fs-license-label">Engangslisens – 1 år</div>
            <p>
              NOK {NOK_PRICES.yearly},-  
              <br />€{EUR_PRICES.yearly}
            </p>
          </button>
        </div>

        <p style={{ marginBottom: "1rem", fontSize: "0.9rem" }}>
          <strong>Valgt modell:</strong> {renderPrices()}
        </p>

        {/* --- JURIDISKE GODKJENNINGER ---  */}
        <div className="fs-checklist">
          <label className="fs-checkitem">
            <input
              type="checkbox"
              checked={checkedTerms}
              onChange={(e) => setCheckedTerms(e.target.checked)}
            />
            Jeg bekrefter at jeg har lest og forstått kjøpsvilkårene.
          </label>

          <label className="fs-checkitem">
            <input
              type="checkbox"
              checked={checkedDelivery}
              onChange={(e) => setCheckedDelivery(e.target.checked)}
            />
            Jeg samtykker til umiddelbar levering og forstår at angreretten da
            bortfaller (Angrerettloven §22 n / EU Digital Content Directive).
          </label>

          <label className="fs-checkitem">
            <input
              type="checkbox"
              checked={checkedPrivacy}
              onChange={(e) => setCheckedPrivacy(e.target.checked)}
            />
            Jeg godtar personvernerklæringen og at Stripe behandler
            betalingsinformasjon.
          </label>

          {(selectedType === "monthly-sub" ||
            selectedType === "yearly-sub") && (
            <label className="fs-checkitem">
              <input
                type="checkbox"
                checked={checkedSubscription}
                onChange={(e) => setCheckedSubscription(e.target.checked)}
              />
              Jeg godtar vilkårene for abonnement og automatisk fornyelse.
            </label>
          )}
        </div>

        <div
          className="admin-modal-actions"
          style={{ marginTop: "1.5rem", display: "flex", gap: "0.7rem" }}
        >
          {/* DISABLED BUTTON */}
          {disableCheckout ? (
            <button className="checkout-button disabled" disabled>
              Fullfør betaling
            </button>
          ) : (
            <CheckoutButton
              product={product}
              billingPeriod={
                selectedType === "monthly-sub" || selectedType === "monthly-one"
                  ? "month"
                  : "year"
              }
              autoRenew={
                selectedType === "monthly-sub" ||
                selectedType === "yearly-sub"
              }
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
