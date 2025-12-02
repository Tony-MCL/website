import React from "react";

const PersonvernPage: React.FC = () => {
  return (
    <main className="page legal-page">
      <section className="legal-hero">
        <h1>Personvernerklæring</h1>
        <p className="legal-intro">
          Denne personvernerklæringen beskriver hvordan Mathisens Morning Coffee
          Labs («vi», «oss») behandler personopplysninger i forbindelse med
          kjøp og bruk av våre apper og nettsider.
        </p>
      </section>

      <section className="legal-section">
        <h2>1. Behandlingsansvarlig</h2>
        <p>
          Behandlingsansvarlig er <strong>Mathisens Morning Coffee Labs</strong>
          .
        </p>
        <ul>
          <li>E-post: support@morningcoffeelabs.no</li>
          <li>Land: Norge</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>2. Hvilke data vi samler inn</h2>
        <p>Vi samler inn og lagrer kun det som er nødvendig for å:</p>
        <ul>
          <li>gjennomføre kjøp og administrere lisenser</li>
          <li>drifte og forbedre appene</li>
          <li>gi support ved behov</li>
        </ul>
        <p>Typiske opplysninger er:</p>
        <ul>
          <li>Navn og e-postadresse</li>
          <li>Informasjon knyttet til kjøp (produkt, beløp, tidspunkt)</li>
          <li>Tekniske data som lisens-ID og lisenshistorikk</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>3. Betaling – Stripe</h2>
        <p>
          Betaling håndteres av <strong>Stripe</strong>. Stripe er egen
          behandlingsansvarlig for betalingsinformasjon som kortdata og
          betalingsmiddel. Vi mottar ikke og lagrer ikke kortnummer eller
          sikkerhetskoder.
        </p>
        <p>
          Vi lagrer kun referanseopplysninger som knytter betalingen til lisensen
          (for eksempel Stripe-kunde-ID, lisens-ID og status).
        </p>
      </section>

      <section className="legal-section">
        <h2>4. Lagring og sikkerhet</h2>
        <p>
          Lisensdata og tilknyttede hendelser kan lagres i sikre skyløsninger
          (for eksempel Firebase/Firestore). Tilgangen er begrenset til det som
          er nødvendig for drift og support.
        </p>
        <p>
          Vi bruker moderne sikkerhetsmekanismer, tilgangsstyring og logging for
          å beskytte data mot uautorisert tilgang.
        </p>
      </section>

      <section className="legal-section">
        <h2>5. Formål og behandlingsgrunnlag</h2>
        <p>Hovedformålene er:</p>
        <ul>
          <li>Å oppfylle avtalen om kjøp og levering av lisens</li>
          <li>Å administrere lisensstatus og tilgang i appen</li>
          <li>Å følge opp supporthenvendelser</li>
        </ul>
        <p>
          Behandlingsgrunnlaget er GDPR artikkel 6 (1) b – avtaleoppfyllelse,
          samt artikkel 6 (1) f – berettiget interesse, der det er relevant
          (f.eks. sikkerhet og misbruksforebygging).
        </p>
      </section>

      <section className="legal-section">
        <h2>6. Lagringstid</h2>
        <p>
          Vi lagrer lisens- og kjøpsrelaterte data så lenge det er nødvendig for
          å:
        </p>
        <ul>
          <li>levere tjenesten</li>
          <li>oppfylle lovpålagte krav (for eksempel bokføring)</li>
          <li>dokumentere historikk ved eventuelle reklamasjoner</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>7. Dine rettigheter</h2>
        <p>Som registrert har du blant annet rett til å:</p>
        <ul>
          <li>be om innsyn i hvilke opplysninger vi har om deg</li>
          <li>be om retting eller sletting der det er mulig</li>
          <li>protestere mot eller begrense behandling i enkelte tilfeller</li>
        </ul>
        <p>
          Ta kontakt på{" "}
          <a href="mailto:support@morningcoffeelabs.no">
            support@morningcoffeelabs.no
          </a>{" "}
          dersom du ønsker å utøve dine rettigheter.
        </p>
      </section>

      <section className="legal-section">
        <h2>8. Deling med tredjeparter</h2>
        <p>
          Vi deler ikke personopplysninger med andre enn det som er nødvendig
          for drift av tjenesten, for eksempel:
        </p>
        <ul>
          <li>Stripe (betaling)</li>
          <li>Skyleverandør for lagring av lisensdata</li>
        </ul>
        <p>
          Slike leverandører er underlagt databehandleravtale eller egne
          personvernvilkår.
        </p>
      </section>

      <section className="legal-section">
        <h2>9. Endringer i personvernerklæringen</h2>
        <p>
          Vi kan oppdatere denne erklæringen ved behov. Vesentlige endringer
          vil bli varslet via nettsiden eller i appen.
        </p>
      </section>
    </main>
  );
};

export default PersonvernPage;
