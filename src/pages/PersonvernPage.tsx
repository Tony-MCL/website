import React from "react";

const PersonvernPage: React.FC = () => {
  return (
    <main className="page legal-page">
      <section className="legal-header">
        <h1>Personvernerklæring</h1>
        <p className="legal-intro">
          Denne personvernerklæringen beskriver hvordan Mathisens Morning Coffee
          Labs behandler personopplysninger i tilknytning til våre nettsider og
          digitale tjenester.
        </p>
      </section>

      <section className="legal-section">
        <h2>1. Behandlingsansvarlig</h2>
        <p>
          Mathisens Morning Coffee Labs er behandlingsansvarlig for
          personopplysninger som samles inn gjennom nettsiden og tjenestene.
        </p>
      </section>

      <section className="legal-section">
        <h2>2. Hvilke opplysninger vi samler inn</h2>
        <p>Typiske opplysninger vi kan behandle er for eksempel:</p>
        <ul>
          <li>Navn og kontaktinformasjon (for eksempel e-postadresse)</li>
          <li>
            Faktureringsopplysninger ved kjøp (håndteres hovedsakelig via
            Stripe)
          </li>
          <li>
            Tekst som sendes inn via kontaktskjema, idebank eller andre
            skjemaer
          </li>
          <li>
            Tekniske data om bruk av tjenesten (for eksempel hvilke sider som
            besøkes)
          </li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>3. Formål og behandlingsgrunnlag</h2>
        <p>
          Opplysningene brukes blant annet til å:
        </p>
        <ul>
          <li>levere og administrere tjenester og lisenser</li>
          <li>håndtere kjøp, betaling og kundeservice</li>
          <li>forbedre og videreutvikle tjenestene</li>
          <li>
            sende relevant informasjon dersom du har samtykket til dette
            (nyhetsbrev o.l.).
          </li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>4. Lagring og sletting</h2>
        <p>
          Vi lagrer personopplysninger så lenge det er nødvendig for formålet
          de ble samlet inn for, eller så lenge vi er pålagt det gjennom
          regnskaps- og bokføringsregler. Opplysninger som ikke lenger er
          nødvendige blir slettet eller anonymisert.
        </p>
      </section>

      <section className="legal-section">
        <h2>5. Dine rettigheter</h2>
        <p>
          Du har rett til innsyn, retting og i noen tilfeller sletting av
          personopplysninger vi har om deg. Du kan også protestere mot eller
          be om begrensning av behandlingen, samt trekke tilbake eventuelle
          samtykker.
        </p>
      </section>

      <section className="legal-section">
        <h2>6. Tredjeparter og databehandlere</h2>
        <p>
          Vi kan bruke underleverandører (for eksempel Stripe for betaling og
          hosting-leverandører) til å behandle data på våre vegne. Disse er
          bundet av databehandleravtaler og kan ikke bruke opplysningene til
          egne formål.
        </p>
      </section>

      <section className="legal-section">
        <h2>7. Endringer i personvernerklæringen</h2>
        <p>
          Personvernerklæringen kan oppdateres ved behov. Oppdatert versjon vil
          alltid være tilgjengelig på denne siden.
        </p>
      </section>

      <section className="legal-section">
        <h2>8. Kontakt</h2>
        <p>
          For spørsmål om personvern kan du kontakte oss via kontaktskjemaet på
          nettsiden.
        </p>
      </section>
    </main>
  );
};

export default PersonvernPage;
