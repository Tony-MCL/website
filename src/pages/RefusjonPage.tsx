import React from "react";

const RefusjonPage: React.FC = () => {
  return (
    <main className="page legal-page">
      <section className="legal-hero">
        <h1>Refusjon og klage</h1>
        <p className="legal-intro">
          Her beskriver vi hvordan vi håndterer refusjon, avbrutte kjøp og
          reklamasjoner for digitale lisenser.
        </p>
      </section>

      <section className="legal-section">
        <h2>1. Digitale varer og angrerett</h2>
        <p>
          Lisensene våre leveres digitalt og aktiveres umiddelbart etter
          gjennomført betaling. I henhold til Angrerettloven §22 n og EU Digital
          Content Directive bortfaller angreretten når:
        </p>
        <ul>
          <li>du ber om umiddelbar levering, og</li>
          <li>
            du bekrefter at angreretten bortfaller når lisensen er levert og
            aktivert.
          </li>
        </ul>
        <p>Dette samtykket gis i kjøpsdialogen før betaling.</p>
      </section>

      <section className="legal-section">
        <h2>2. Refusjon ved tekniske problemer</h2>
        <p>
          Dersom du har betalt, men ikke får tilgang til lisensen eller PRO
          funksjoner på grunn av teknisk feil hos oss, vil vi:
        </p>
        <ul>
          <li>forsøke å rette feilen og aktivere lisensen så raskt som mulig</li>
          <li>
            vurdere refusjon eller forlengelse av lisensperioden dersom problemet
            ikke kan løses innen rimelig tid
          </li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>3. Avslutning av abonnement</h2>
        <p>
          Ved abonnement kan du når som helst stoppe videre fornyelse via Stripe
          eller ved å kontakte oss. Allerede belastede perioder refunderes
          normalt ikke, men du beholder tilgangen ut inneværende periode.
        </p>
      </section>

      <section className="legal-section">
        <h2>4. Feil ved belastning</h2>
        <p>
          Dersom du mener at det er gjort en feilbelastning, ber vi deg ta
          kontakt med oss så snart som mulig, og senest innen 30 dager etter at
          du oppdaget feilen. Vi vil da gjennomgå transaksjonen sammen med deg
          og Stripe.
        </p>
      </section>

      <section className="legal-section">
        <h2>5. Slik kontakter du oss</h2>
        <p>
          Send en e-post til{" "}
          <a href="mailto:support@morningcoffeelabs.no">
            support@morningcoffeelabs.no
          </a>{" "}
          med:
        </p>
        <ul>
          <li>navn og e-postadresse</li>
          <li>hvilket produkt lisensen gjelder</li>
          <li>dato for kjøp og eventuelt Stripe-kvittering</li>
          <li>en kort beskrivelse av problemet</li>
        </ul>
      </section>
    </main>
  );
};

export default RefusjonPage;
