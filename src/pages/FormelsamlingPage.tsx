import React from "react";

const FormelsamlingPage: React.FC = () => {
  return (
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
        {/* Venstre kolonne */}
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
              Målet er å samle de mest brukte formlene i én strukturert,
              konsistent og oppdatert løsning:
            </p>
            <ul>
              <li>Unngå feiltasting i tilfeldige Excel-ark og notatbøker</li>
              <li>Ha samme verktøy tilgjengelig på PC og mobil</li>
              <li>Enhetlig måte å legge inn verdier og lese resultater på</li>
              <li>Lett å bygge ut med nye tema etter hvert</li>
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

        {/* Høyre kolonne – produktkort */}
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
              Lisenshåndtering og betaling via Stripe kobles inn i neste steg.
            </div>
          </div>

          <div className="fs-licensing">
            <h4>Lisensmodeller (plan)</h4>
            <div className="fs-license-grid">
              <div className="fs-license-card">
                <div className="fs-license-label">Månedlig lisens</div>
                <p>For fleksibel bruk og testing i mindre team.</p>
                <ul>
                  <li>Tilgang til alle moduler i perioden</li>
                  <li>Kan avsluttes når som helst</li>
                </ul>
                <button className="fs-license-btn" disabled>
                  Stripe-integrasjon kommer
                </button>
              </div>

              <div className="fs-license-card">
                <div className="fs-license-label">Årlig lisens</div>
                <p>For faste brukere og bedrifter som vil standardisere.</p>
                <ul>
                  <li>Redusert pris per måned</li>
                  <li>Passer godt for prosjektavdelinger</li>
                </ul>
                <button className="fs-license-btn" disabled>
                  Stripe-integrasjon kommer
                </button>
              </div>
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
  );
};

export default FormelsamlingPage;
