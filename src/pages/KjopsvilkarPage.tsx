import React from "react";

const KjopsvilkarPage: React.FC = () => {
  return (
    <main className="page legal-page">
      <section className="legal-hero">
        <h1>Kjøpsvilkår – digitale lisenser</h1>
        <p className="legal-intro">
          Disse kjøpsvilkårene gjelder for kjøp av digitale programvarelisenser
          fra Mathisens Morning Coffee Labs («vi», «oss»). Vilkårene gjelder
          både for enkeltkjøp (engangslisenser) og abonnement.
        </p>
      </section>

      <section className="legal-section">
        <h2>1. Selger</h2>
        <p>
          Selger er <strong>Mathisens Morning Coffee Labs</strong> (MCL).
        </p>
        <ul>
          <li>Navn: Mathisens Morning Coffee Labs</li>
          <li>Organisasjonsnummer: [fylles inn]</li>
          <li>E-post: support@morningcoffeelabs.no</li>
          <li>Land: Norge</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>2. Produkt – digital lisens</h2>
        <p>
          Produktene er digitale programvarelisenser som gir tilgang til funksjon
          og innhold i våre apper (for eksempel Digital Formelsamling). Lisensen
          gir en ikke-eksklusiv, personlig bruksrett til programvaren i
          lisensperioden.
        </p>
        <p>
          Lisensen leveres ved at det opprettes en lisensoppføring i våre
          systemer kombinert med et lisens-token som lagres lokalt hos deg.
        </p>
      </section>

      <section className="legal-section">
        <h2>3. Pris, valuta og betaling</h2>
        <p>
          Pris oppgis i norske kroner (NOK) og eventuelt tilsvarende beløp i
          euro (EUR). Endelig pris og valuta vises tydelig i Stripe før du
          bekrefter kjøpet. Eventuell merverdiavgift håndteres etter gjeldende
          regelverk.
        </p>
        <p>
          Betaling skjer via <strong>Stripe</strong>. Vi lagrer ingen
          kortdetaljer selv.
        </p>
      </section>

      <section className="legal-section">
        <h2>4. Abonnement og automatisk fornyelse</h2>
        <p>
          Ved valg av abonnement trekkes beløpet automatisk ved starten av hver
          nye periode (måned eller år). Dette fremgår tydelig både i vår
          kjøpsdialog og i Stripe før du bekrefter.
        </p>
        <p>
          Du kan når som helst stoppe videre fornyelse via Stripe eller ved å
          kontakte oss. Allerede gjennomførte perioder refunderes normalt ikke.
        </p>
      </section>

      <section className="legal-section">
        <h2>5. Engangslisenser</h2>
        <p>
          Engangslisenser gir tilgang til PRO-funksjonalitet i en avgrenset
          periode (for eksempel 1 måned eller 1 år) uten automatisk fornyelse.
          Når perioden er utløpt, må du kjøpe ny lisens for å fortsette å bruke
          PRO-funksjonene.
        </p>
      </section>

      <section className="legal-section">
        <h2>6. Levering og tilgang</h2>
        <p>
          Levering skjer umiddelbart etter gjennomført betaling. Du sendes
          tilbake til vår nettside, hvor lisensen aktiveres automatisk, og
          appen vil gjenkjenne lisensen på den enheten du bruker.
        </p>
      </section>

      <section className="legal-section">
        <h2>7. Angrerett og digitale varer</h2>
        <p>
          For digitale varer som leveres umiddelbart, gjelder unntak fra
          angreretten i henhold til Angrerettloven §22 n og EU Digital Content
          Directive. Det betyr at:
        </p>
        <ul>
          <li>
            Du må uttrykkelig samtykke til at leveringen starter umiddelbart.
          </li>
          <li>
            Du må akseptere at angreretten bortfaller når lisensen er levert og
            aktivert.
          </li>
        </ul>
        <p>
          Dette samtykket innhentes i vår kjøpsdialog før du kan fullføre
          betalingen.
        </p>
      </section>

      <section className="legal-section">
        <h2>8. Reklamasjon</h2>
        <p>
          Dersom det oppstår feil som gjør at du ikke får tilgang til lisensen
          du har betalt for, har du rett til retting eller ny levering innen
          rimelig tid. Ta kontakt på{" "}
          <a href="mailto:support@morningcoffeelabs.no">
            support@morningcoffeelabs.no
          </a>
          .
        </p>
      </section>

      <section className="legal-section">
        <h2>9. Endringer i produkt og vilkår</h2>
        <p>
          Vi kan oppdatere vilkår, funksjonalitet og priser over tid. Ved
          vesentlige endringer i pågående abonnement vil vi varsle deg på e-post
          eller i appen. Fortsatt bruk etter varsel regnes som aksept av nye
          vilkår.
        </p>
      </section>

      <section className="legal-section">
        <h2>10. Tvister og lovvalg</h2>
        <p>
          Avtalen reguleres av norsk lov. Eventuelle tvister søkes løst
          gjennom dialog. Dersom det ikke lykkes, kan saken bringes inn for
          Forbrukertilsynet/Forbrukerklageutvalget eller ordinære domstoler med
          Oslo tingrett som verneting.
        </p>
      </section>

      <section className="legal-section">
        <p style={{ fontSize: "0.85rem", color: "var(--mcl-text-dim)" }}>
          Dette dokumentet er ment som en praktisk og ryddig beskrivelse av
          vilkårene. For spesielle behov eller tolkning bør juridisk rådgiver
          konsulteres.
        </p>
      </section>
    </main>
  );
};

export default KjopsvilkarPage;
