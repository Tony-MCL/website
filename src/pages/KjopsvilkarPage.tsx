import React from "react";

const KjopsvilkarPage: React.FC = () => {
  return (
    <main className="page legal-page">
      <section className="legal-header">
        <h1>Kjøpsvilkår</h1>
        <p className="legal-intro">
          Disse kjøpsvilkårene gjelder for kjøp av digitale produkter fra
          Mathisens Morning Coffee Labs («vi», «oss» eller «selgeren»).
        </p>
      </section>

      <section className="legal-section">
        <h2>1. Partene</h2>
        <p>
          Selger er Mathisens Morning Coffee Labs. Kjøper er den personen eller
          virksomheten som gjennomfører bestillingen i nettbutikken eller via
          våre apper.
        </p>
      </section>

      <section className="legal-section">
        <h2>2. Produkt og lisens</h2>
        <p>
          Produktene våre leveres som digitale tjenester og programvare. Ved
          kjøp får du en ikke-eksklusiv lisens til å bruke tjenesten i henhold
          til valgt lisensmodell (for eksempel månedlig, årlig eller
          engangslisens), og innenfor de rammer som er beskrevet i
          produktinformasjonen.
        </p>
      </section>

      <section className="legal-section">
        <h2>3. Pris og betaling</h2>
        <p>
          Prisene som vises i nettbutikken gjelder på bestillingstidspunktet og
          oppgis i NOK, og i noen tilfeller også veiledende pris i EUR. Betaling
          håndteres via Stripe. For abonnement vil beløpet trekkes automatisk
          ved hver fornyelse inntil abonnementet sies opp.
        </p>
      </section>

      <section className="legal-section">
        <h2>4. Levering av digitalt innhold</h2>
        <p>
          Lisensen aktiveres normalt umiddelbart etter gjennomført betaling.
          Ved å bekrefte kjøpet samtykker du til at leveringen starter før
          angrefristen er utløpt.
        </p>
      </section>

      <section className="legal-section">
        <h2>5. Angrerett og oppsigelse</h2>
        <p>
          For digitale tjenester som leveres umiddelbart, bortfaller retten til
          å angre når du har samtykket til at leveringen starter før
          angrefristen utløper. Abonnement kan sies opp når som helst og vil da
          løpe ut inneværende betalte periode.
        </p>
      </section>

      <section className="legal-section">
        <h2>6. Reklamasjon</h2>
        <p>
          Dersom tjenesten ikke fungerer som beskrevet, kan du kontakte oss via
          kontaktskjemaet på nettsiden. Vi vil da forsøke å rette feilen, gi
          veiledning eller tilby annen rimelig løsning.
        </p>
      </section>

      <section className="legal-section">
        <h2>7. Endringer i vilkår</h2>
        <p>
          Vi kan oppdatere disse vilkårene ved behov. Ved vesentlige endringer
          vil vi informere gjennom nettsiden eller e-post. Oppdatert versjon vil
          alltid være tilgjengelig på denne siden.
        </p>
      </section>

      <section className="legal-section">
        <h2>8. Kontaktinformasjon</h2>
        <p>
          Spørsmål om kjøp eller lisens kan rettes via
          kontaktsiden på nettsiden.
        </p>
      </section>
    </main>
  );
};

export default KjopsvilkarPage;
