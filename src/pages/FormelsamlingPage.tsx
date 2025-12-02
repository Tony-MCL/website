// src/pages/FormelsamlingPage.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import LicensePurchaseModal from "../components/LicensePurchaseModal";

const FormelsamlingPage: React.FC = () => {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  return (
    <main className="page formelsamling-page">
      <section className="fs-hero">
        <h1>Formelsamling for elektro og automasjon</h1>
        <p className="fs-tagline">
          En digital formelsamling bygget for hverdagen i kraftverk, tavlerom
          og felt — med fokus på praktiske beregninger og dokumentasjon.
        </p>
      </section>

      <section className="fs-layout">
        {/* Venstre kolonne – beskrivelse */}
        <div className="fs-main">
          <section className="fs-section">
            <h2>Hva er Formelsamlingen?</h2>
            <p>
              Formelsamlingen er et digitalt verktøy som samler relevante
              formler og beregninger for elektro- og automasjonsfag. I stedet
              for spredte regneark og notater får du ett sted å jobbe.
            </p>
            <p>
              Løsningen er bygget for teknisk bruk, ikke som et generelt
              kontorverktøy – målet er at du skal kunne stole på oppsettet
              når du dokumenterer løsninger og vurderinger.
            </p>
          </section>

          <section className="fs-section">
            <h2>Typiske bruksområder</h2>
            <ul>
              <li>Rask kontroll av kabeltverrsnitt og vernvalg</li>
              <li>Enkle selektivitetsvurderinger</li>
              <li>Estimater for belastning og effekt</li>
              <li>
                Felles inngangsparametere som gir sporbarhet i beregningene
              </li>
            </ul>
          </section>

          <section className="fs-section">
            <h2>Innhold i første versjon</h2>
            <p>
              Første versjon av Formelsamlingen fokuserer på praktiske
              beregninger, blant annet:
            </p>
            <ul>
              <li>Grunnleggende effekt, strøm og spenning</li>
              <li>Kabel- og vernrelaterte beregninger</li>
              <li>Enkel selektivitet og belastning</li>
              <li>Utgangspunkt for videre spesialmoduler</li>
            </ul>
          </section>
        </div>

        {/* Høyre kolonne – produktkort + lisensinfo */}
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
              Appen kjører som egen webapplikasjon. Du kan åpne den direkte for
              å bruke gratisinnhold, eller kjøpe lisens for full funksjonalitet.
            </div>

            <div style={{ marginTop: "1rem", display: "flex", gap: "0.6rem" }}>
              <a
                href="https://tony-mcl.github.io/formler/"
                target="_blank"
                rel="noreferrer"
                className="status-button"
                style={{ textDecoration: "none", textAlign: "center" }}
              >
                Åpne Formelsamlingen
              </a>

              <button
                type="button"
                className="checkout-button"
                onClick={() => setShowPurchaseModal(true)}
              >
                Kjøp lisens
              </button>
            </div>
          </div>

          <div className="fs-licensing">
            <h4>Lisensmodeller</h4>
            <div className="fs-license-grid">
              <div className="fs-license-card">
                <div className="fs-license-label">Månedlig lisens</div>
                <p>For fleksibel bruk og testing i mindre team.</p>
                <ul>
                  <li>Tilgang til alle moduler i perioden</li>
                  <li>Kan avsluttes når som helst</li>
                  <li>Pris: NOK 49,- / ca €4,50 per måned</li>
                </ul>
              </div>

              <div className="fs-license-card">
                <div className="fs-license-label">Årlig lisens</div>
                <p>For faste brukere og bedrifter som vil standardisere.</p>
                <ul>
                  <li>Redusert pris per måned</li>
                  <li>Passer godt for prosjektavdelinger</li>
                  <li>Pris: NOK 490,- / ca €45 per år</li>
                </ul>
              </div>
            </div>

            <p className="fs-note" style={{ marginTop: "0.9rem" }}>
              Selve betalingen skjer via Stripe Checkout. Etter fullført kjøp
              sendes du tilbake til nettsiden for å aktivere lisensen, og
              Formelsamlingen vil da finne lisensen automatisk neste gang du
              åpner appen.
            </p>
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
            <h3>Åpen tilgang</h3>
            <ul>
              <li>Enkel tilgang til utvalgte formler og oppsett</li>
              <li>Mulighet til å teste arbeidsflyten før kjøp</li>
            </ul>
          </div>

          <div className="fs-access-card">
            <h3>Lisensiert innhold</h3>
            <ul>
              <li>Flere moduler og avanserte beregninger</li>
              <li>Planlagt eksport og rapporter</li>
              <li>Videreutvikling med fokus på kraft og industri</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Lisenskjøp-modal */}
      <LicensePurchaseModal
        productId="formelsamling"
        productName="Formelsamling – MCL Edition"
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
      />
    </main>
  );
};

export default FormelsamlingPage;
