import React from "react";

const BrukervilkarPage: React.FC = () => {
  return (
    <main className="page legal-page">
      <section className="legal-header">
        <h1>Brukervilkår</h1>
        <p className="legal-intro">
          Disse brukervilkårene regulerer hvordan du kan bruke tjenester og
          apper levert av Mathisens Morning Coffee Labs.
        </p>
      </section>

      <section className="legal-section">
        <h2>1. Lisens og bruk</h2>
        <p>
          Du får en personlig, ikke-overførbar lisens til å bruke tjenesten i
          henhold til valgt lisensmodell. Lisensen gir rett til normal bruk
          internt i egen virksomhet, men ikke til videresalg eller
          videredistribusjon av tjenesten.
        </p>
      </section>

      <section className="legal-section">
        <h2>2. Konto og tilgang</h2>
        <p>
          Der tjenesten krever innlogging, er du ansvarlig for å ta vare på
          innloggingsinformasjonen og sørge for at uvedkommende ikke får
          tilgang. Misbruk eller mistenkt misbruk må meldes til oss så snart
          som mulig.
        </p>
      </section>

      <section className="legal-section">
        <h2>3. Akseptabel bruk</h2>
        <p>
          Tjenestene skal ikke brukes på en måte som bryter gjeldende lovverk,
          krenker andres rettigheter eller forsøker å omgå tekniske
          begrensninger og lisensmekanismer.
        </p>
      </section>

      <section className="legal-section">
        <h2>4. Tilgjengelighet og endringer</h2>
        <p>
          Vi tilstreber stabil drift, men kan ikke garantere 100 % oppetid.
          Tjenestene kan oppdateres eller endres over tid, blant annet for å
          forbedre funksjonalitet eller sikkerhet.
        </p>
      </section>

      <section className="legal-section">
        <h2>5. Ansvarsbegrensning</h2>
        <p>
          Tjenestene leveres «som de er». Vi er ikke ansvarlige for indirekte
          tap, som f.eks. tapt fortjeneste eller driftsstans, så langt dette er
          tillatt etter gjeldende rett.
        </p>
      </section>

      <section className="legal-section">
        <h2>6. Endringer i brukervilkår</h2>
        <p>
          Brukervilkårene kan oppdateres ved behov. Vesentlige endringer vil bli
          varslet gjennom nettsiden eller per e-post. Oppdatert versjon vil
          alltid være tilgjengelig her.
        </p>
      </section>
    </main>
  );
};

export default BrukervilkarPage;
