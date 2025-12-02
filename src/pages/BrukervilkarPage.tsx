import React from "react";

const BrukervilkarPage: React.FC = () => {
  return (
    <main className="page legal-page">
      <section className="legal-hero">
        <h1>Brukervilkår</h1>
        <p className="legal-intro">
          Disse brukervilkårene regulerer bruken av apper og tjenester levert av
          Mathisens Morning Coffee Labs («MCL», «vi», «oss»).
        </p>
      </section>

      <section className="legal-section">
        <h2>1. Lisens og bruksrett</h2>
        <p>
          Når du kjøper eller får tilgang til en lisens, får du en personlig,
          ikke-eksklusiv og ikke-overførbar rett til å bruke appen i
          lisensperioden.
        </p>
        <p>Det er ikke tillatt å:</p>
        <ul>
          <li>kopiere, videreselge eller distribuere appen videre</li>
          <li>omgå lisenssystemet eller endre tekniske sperrer</li>
          <li>bruke appen til ulovlige formål</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>2. Krav til bruker og miljø</h2>
        <p>
          Du er selv ansvarlig for å ha nødvendig utstyr, nettleser og
          internettilgang for å bruke appene. Ytelse og opplevelse kan variere
          etter enhet og nettverk.
        </p>
      </section>

      <section className="legal-section">
        <h2>3. Endringer og oppdateringer</h2>
        <p>
          Vi kan oppdatere appene fortløpende, for eksempel for å rette feil,
          forbedre funksjon eller tilpasse oss endringer i regelverk og
          teknologi.
        </p>
        <p>
          Ved større endringer som påvirker funksjonalitet eller lisensmodell,
          vil vi informere via nettsiden eller i appen.
        </p>
      </section>

      <section className="legal-section">
        <h2>4. Ansvarsbegrensning</h2>
        <p>
          Appene våre er utviklet for profesjonell og praktisk bruk, men resultat
          og tolkning av beregninger er alltid brukerens ansvar. Du må selv
          kontrollere at forutsetninger, input og resultater er korrekte for
          ditt konkrete formål.
        </p>
        <p>
          Vi er ikke ansvarlig for indirekte tap, følgeskader eller tapte
          inntekter som følge av bruk eller manglende tilgjengelighet, med
          mindre annet følger av ufravikelig lov.
        </p>
      </section>

      <section className="legal-section">
        <h2>5. Misbruk og stenging</h2>
        <p>
          Ved alvorlig misbruk, forsøk på hacking eller bevisst omgåelse av
          lisenssystemet, kan vi midlertidig eller permanent stenge tilgangen
          til lisensen.
        </p>
      </section>

      <section className="legal-section">
        <h2>6. Kontakt</h2>
        <p>
          Har du spørsmål om brukervilkårene, ta kontakt på{" "}
          <a href="mailto:support@morningcoffeelabs.no">
            support@morningcoffeelabs.no
          </a>
          .
        </p>
      </section>
    </main>
  );
};

export default BrukervilkarPage;
