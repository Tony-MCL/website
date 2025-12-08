import React from "react";

const AboutPage: React.FC = () => {
  return (
    <main className="page about-page">
      {/* HERO */}
      <section className="about-hero">
        <h1>Om Morning Coffee Labs</h1>
        <p className="about-tagline">
          Morning Coffee Labs er et lite verksted for digitale verktøy. Vi
          bygger løsninger som gjør prosjekthverdagen enklere – med fokus på
          praksis, kvalitet og folkene som faktisk skal bruke verktøyene.
        </p>
      </section>

      {/* HVA VI ER */}
      <section className="about-section">
        <h2>Vi er digitale verktøymakere</h2>
        <p>
          Mange omtaler seg som apputviklere eller systemleverandører. Vi
          foretrekker å kalle oss <strong>digitale verktøymakere</strong>. For
          oss handler arbeidet om det samme som godt håndverk:
        </p>
        <ul>
          <li>Verktøyet skal være til å stole på</li>
          <li>Det skal løse et konkret problem i hverdagen</li>
          <li>Det skal være enkelt å forstå for de som bruker det</li>
        </ul>
        <p>
          Teknologien er viktig, men den er ikke målet i seg selv. Målet er at
          folk som jobber i og rundt prosjekter får bedre oversikt, mindre rot
          og færre ting som glipper mellom stolene.
        </p>
      </section>

      {/* HVA VI GJØR */}
      <section className="about-section">
        <h2>Hva vi bygger</h2>
        <p>
          Morning Coffee Labs står bak <strong>Manage System</strong> – en serie
          digitale verktøy for prosjekter. Første modul ut er{" "}
          <strong>Manage Progress</strong>, tett fulgt av{" "}
          <strong>Manage Documents</strong>. Disse verktøyene er laget for team
          som trenger struktur uten å drukne i tunge systemer.
        </p>
        <p>
          I tillegg til egne produkter hjelper vi bedrifter med å utvikle{" "}
          <strong>egne digitale verktøy</strong>. Det kan for eksempel være:
        </p>
        <ul>
          <li>å gjøre om Excel-maler til robuste apper</li>
          <li>å digitalisere sjekklister, skjema og arbeidsflyter</li>
          <li>å samle informasjon og dokumentasjon som i dag ligger spredt</li>
          <li>å bygge små, målrettede verktøy som støtter konkrete prosesser</li>
        </ul>
        <p>
          Fellesnevneren er at verktøyene bygges for å brukes i praksis, ikke
          bare for å se fine ut i en presentasjon.
        </p>
      </section>

      {/* HVORDAN VI JOBBER MED KUNDER */}
      <section className="about-section">
        <h2>Hvordan vi jobber sammen med kunder</h2>
        <p>
          Vi vet at de beste løsningene kommer når fagfolk får bidra med sin
          erfaring, og vi får oversette den til gode digitale verktøy. Derfor er
          prosessen vår enkel:
        </p>
        <ol>
          <li>
            <strong>Vi lytter.</strong> Du forklarer hvordan dere jobber i dag,
            hva som fungerer, og hva som skaper friksjon.
          </li>
          <li>
            <strong>Vi konkretiserer.</strong> Sammen finner vi ut hva et
            digitalt verktøy faktisk bør gjøre – og hva det ikke trenger å gjøre.
          </li>
          <li>
            <strong>Vi bygger stegvis.</strong> Først en enkel versjon som kan
            testes i praksis, deretter forbedringer basert på erfaring.
          </li>
        </ol>
        <p>
          Du snakker direkte med den som designer og utvikler verktøyet. Det er
          kort vei fra idé til beslutning, og endringer kan tas fortløpende uten
          tunge runder gjennom mange ledd.
        </p>
      </section>

      {/* BAKGRUNN – UTVIDET, MEN UFORMELL */}
      <section className="about-section">
        <h2>Bakgrunn og erfaring</h2>
        <p>
          Morning Coffee Labs er bygget på mange års erfaring fra praktiske fag,
          drift og tekniske prosjekter. Erfaringen spenner fra praktisk arbeid i
          felt og montasje til prosjektstøtte, salg og leveranser mot krevende
          kunder.
        </p>
        <p>
          Denne miksen gjør at vi kjenner både dokumentasjonskrav, kvalitet,
          tverrfaglig samarbeid og hvor det ofte oppstår misforståelser i
          prosjekter. Det gir et godt utgangspunkt for å bygge digitale verktøy
          som oppleves som hjelp i arbeidshverdagen – ikke som nok et system
          som står i veien.
        </p>
      </section>

      {/* VIDERE RETNING */}
      <section className="about-section">
        <h2>Videre retning</h2>
        <p>
          Videre satsing handler om to ting: å bygge ut Manage System med flere
          verktøy, og å hjelpe bedrifter som ønsker sine egne løsninger. Målet
          er ikke å bli størst mulig, men å levere digitale verktøy som folk
          faktisk er glad for å bruke.
        </p>
        <p>
          Hvis du kjenner på at dagens verktøy ikke helt matcher måten dere
          jobber på, eller dere sitter på viktige Excel-ark og rutiner som burde
          vært satt mer i system, tar vi gjerne en prat om hva som kan la seg
          gjøre.
        </p>
      </section>
    </main>
  );
};

export default AboutPage;
