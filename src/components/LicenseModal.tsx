import React from "react";
import CheckoutButton from "./CheckoutButton";

type LicenseModalProps = {
  open: boolean;
  onClose: () => void;
  product: string;
  productName: string;
};

const LicenseModal: React.FC<LicenseModalProps> = ({
  open,
  onClose,
  product,
  productName,
}) => {
  if (!open) {
    return null;
  }

  const handleBackdropClick = () => {
    onClose();
  };

  const handleInnerClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="admin-modal-backdrop" onClick={handleBackdropClick}>
      <div className="admin-modal" onClick={handleInnerClick}>
        <h2>Kjøp lisens – {productName}</h2>

        <div className="admin-modal-meta">
          <div>
            <span className="admin-modal-label">Selger</span>
            <div className="admin-modal-field">
              Mathisens Morning Coffee Labs
            </div>

            <span className="admin-modal-label">Betalingsløsning</span>
            <div className="admin-modal-field">
              Stripe Checkout (kort m.m. slik Stripe støtter)
            </div>
          </div>

          <div>
            <span className="admin-modal-label">Produkt</span>
            <div className="admin-modal-field">{productName}</div>

            <span className="admin-modal-label">Kort fortalt</span>
            <div className="admin-modal-field">
              Digital programvarelisens for én bruker. Lisensen gir tilgang til
              PRO-funksjoner i appen på den enheten/brukeren hvor lisensen
              aktiveres.
            </div>
          </div>
        </div>

        <div className="admin-modal-body">
          <p>
            Her velger du lisensmodell før du sendes videre til Stripe for selve
            betalingen. I Stripe-vinduet får du full oversikt over pris,
            eventuelle avgifter og hva som trekkes nå og ved fornyelse (for
            abonnement).
          </p>
          <p>
            Du kan alltid se gjennom oppsummeringen i Stripe før du bekrefter.
            Ingen betaling gjennomføres før du eksplisitt godkjenner der.
          </p>
          <p>
            For abonnement kan du når som helst avslutte fornyelsen via Stripe
            eller ved å kontakte oss. Engangslisenser utløper automatisk når
            perioden er over.
          </p>
        </div>

        <section className="fs-licensing" style={{ marginTop: "1rem" }}>
          <h4>Velg lisensmodell</h4>
          <div className="fs-license-grid">
            <div className="fs-license-card">
              <div className="fs-license-label">Abonnement – per måned</div>
              <p>Fleksibel lisens som fornyes automatisk hver måned.</p>
              <ul>
                <li>Passer for testing og prosjektperioder</li>
                <li>Kan avsluttes når som helst</li>
              </ul>
              <CheckoutButton
                product={product}
                billingPeriod="month"
                autoRenew={true}
                label="Kjøp månedlig abonnement"
              />
            </div>

            <div className="fs-license-card">
              <div className="fs-license-label">Abonnement – per år</div>
              <p>Årlig lisens med forutsigbar kostnad.</p>
              <ul>
                <li>Fornyes automatisk hvert år</li>
                <li>God løsning for faste brukere</li>
              </ul>
              <CheckoutButton
                product={product}
                billingPeriod="year"
                autoRenew={true}
                label="Kjøp årlig abonnement"
              />
            </div>

            <div className="fs-license-card">
              <div className="fs-license-label">Engangslisens – 1 måned</div>
              <p>Tidsbegrenset lisens uten automatisk fornyelse.</p>
              <ul>
                <li>Gjelder i én måned fra kjøpsdato</li>
                <li>Ingen videre trekk etter perioden</li>
              </ul>
              <CheckoutButton
                product={product}
                billingPeriod="month"
                autoRenew={false}
                label="Kjøp 1 måneds lisens (engang)"
              />
            </div>

            <div className="fs-license-card">
              <div className="fs-license-label">Engangslisens – 1 år</div>
              <p>For deg som vil ha et helt år uten automatisk fornyelse.</p>
              <ul>
                <li>Gjelder i ett år fra kjøpsdato</li>
                <li>Ingen automatisk fornyelse når perioden utløper</li>
              </ul>
              <CheckoutButton
                product={product}
                billingPeriod="year"
                autoRenew={false}
                label="Kjøp 1 års lisens (engang)"
              />
            </div>
          </div>
        </section>

        <div className="admin-modal-actions">
          <button
            type="button"
            className="admin-secondary-button"
            onClick={onClose}
          >
            Lukk
          </button>
        </div>
      </div>
    </div>
  );
};

export default LicenseModal;
