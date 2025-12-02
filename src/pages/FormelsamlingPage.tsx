import React, { useState } from "react";
import LicenseModal from "../components/LicenseModal";

const FormelsamlingPage: React.FC = () => {
  const [showLicenseModal, setShowLicenseModal] = useState(false);

  const openLicenseModal = () => setShowLicenseModal(true);
  const closeLicenseModal = () => setShowLicenseModal(false);

  return (
    <>
      <LicenseModal
        open={showLicenseModal}
        onClose={closeLicenseModal}
        product="formelsamling"
        productName="Digital Formelsamling"
      />
      <main className="page formelsamling-page">
        {/* Top / intro */}
        <section className="fs-hero">
          <h1>Digital Formelsamling</h1>
          <p className="fs-tagline">
            Én plass for de viktigste beregningene innen elektro, kraft og
            automasjon – bygget for praktisk bruk på kontor og i felt.
          </p>
        </section>

        {/* Hovedlayout */}
        <section className="fs-layout">
          {/* Venstre kolonne – tekstlig innhold */}
          <div className="fs-main">
            <section className="fs-section">
              <h2>Hvem er den for?</h2>
              <p>
                Formelsamlingen er laget for fagfolk som jobber med prosjektering,
                drift og feilsøking:
              </p>
              <ul>
                <li>Rådgivende ingeniører og prosjekterende</li>
                <li>Drifts- og vedlikeholdspersonell i kraftverk og industri</li>
                <li>Automatikk- og elektroentreprenører</li>
                <li>Teknisk personell som vil ha kontroll på beregningene</li>
              </ul>
            </section>

            <section className="fs-section">
              <h2>Hva løser den?</h2>
              <p>
                I stedet for spredte Excel-ark, gamle notater og manuelle
                utregninger samles alt i ett verktøy:
              </p>
              <ul>
                <li>Unngår “hjemmesnekrede” varianter av samme formel</li>
                <li>Lettere å kvalitetssikre og oppdatere grunnlaget</li>
                <li>Samme grensesnitt for alle beregninger</li>
              </ul>
              <p>
                Målet er å gjøre det enkelt å få riktige tall, dokumentere
                forutsetninger og bevare sporbarhet i etterkant.
              </p>
            </section>

            <section className="fs-section">
              <h2>Innhold i første versjon</h2>
              <p>
                Første versjon av Formelsamlingen fokuserer på praktiske
                beregninger, blant annet:
              </p>
              <ul>
                <li>Grunnleggende effekt, strøm og spenning</li>
                <li>Lastberegninger</li>
                <li>Spenningsfall</li>
                <li>Plass til videre utvidelser innen kraft og automasjon</li>
              </ul>
              <p>
                Etter hvert som behovene melder seg, kan nye moduler og tema
                legges til uten at strukturen endres.
              </p>
            </section>
          </div>

          {/* Høyre kolonne – produktkort + kjøp */}
          <aside className="fs-side">
            <div className="fs-product-card">
              <div className="fs-badge">V1 · På vei mot Pro</div>
              <h3>Formelsamling – MCL Edition</h3>
              <p className="fs-product-lead">
                Bygget for fagfolk, med fokus på tydelige resultater og
                dokumenterbare beregninger.
              </p>

              <ul className="fs-product-list">
                <li>Strukturerte kategorier og formler</li>
                <li>Felles UI for alle beregninger</li>
                <li>Mørkt tema tilpasset skjermbruk</li>
                <li>Planlagt eksport og rapportfunksjon</li>
              </ul>

              <div className="fs-note">
                Betaling håndteres via Stripe Checkout. Etter kjøp sendes du
                tilbake til nettsiden med bekreftelse.
              </div>

              <div
                style={{
                  marginTop: "1.1rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <a
                  href="https://tony-mcl.github.io/formler/"
                  className="status-button"
                  style={{ textAlign: "center" }}
                >
                  Åpne Formelsamling
                </a>
                <button
                  type="button"
                  className="checkout-button"
                  onClick={openLicenseModal}
                >
                  Kjøp lisens
                </button>
              </div>
            </div>
          </aside>
        </section>

        {/* Gratis vs lisensiert */}
        <section className="fs-access">
          <h2>Gratis innhold og lisensiert funksjon</h2>
          <p className="fs-access-text">
            Tanken er å kombinere åpen tilgang på en del innhold med lisensiert
            funksjonalitet for mer avanserte moduler og eksport.
          </p>

          <div className="fs-access-grid">
            <div className="fs-access-card">
              <h3>Tilgjengelig for alle</h3>
              <ul>
                <li>Oversikt over formler og struktur</li>
                <li>Noen grunnleggende beregninger</li>
                <li>Mulighet til å teste opplevelsen</li>
              </ul>
            </div>

            <div className="fs-access-card">
              <h3>Med lisens</h3>
              <ul>
                <li>Full tilgang til alle beregningsmoduler</li>
                <li>Planlagt funksjon for eksport/rapport</li>
                <li>Videre spesialtilpasninger for proffbruk</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default FormelsamlingPage;
