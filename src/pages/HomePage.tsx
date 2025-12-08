import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <main className="page home-page">
      {/* HERO */}
      <section className="hero">
        <h1 className="hero-title">Morning Coffee Labs</h1>

        <p className="hero-tagline">
          Digitale verktøy som gjør prosjekthverdagen enklere – for folk som
          jobber i og rundt prosjekter, uansett bransje.
        </p>

        <p className="hero-sub">
          Vi bygger praktiske, gjennomførte løsninger for planlegging,
          dokumentasjon og daglige oppgaver. Erfaring fra praktiske fag og
          tekniske prosjekter gir oss et realistisk blikk på hva som faktisk
          fungerer i hverdagen, ikke bare på papiret.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem" }}>
          <Link to="/om" className="hero-cta">
            Les mer om Morning Coffee Labs →
          </Link>
          <Link
            to="/kontakt"
            style={{
              alignSelf: "center",
              fontSize: "0.95rem",
              textDecoration: "underline",
            }}
          >
            Ta kontakt om et digitalt verktøy →
          </Link>
        </div>
      </section>

      {/* SEKSJON: PRODUKTER / VERKTØY */}
      <section style={{ marginTop: "2.5rem" }}>
        <h2 style={{ marginBottom: "0.4rem" }}>Hva vi bygger</h2>
        <p
          style={{
            marginTop: 0,
            marginBottom: "1.4rem",
            maxWidth: "720px",
            color: "var(--mcl-text-dim)",
            lineHeight: 1.6,
          }}
        >
          Morning Coffee Labs utvikler egne digitale verktøy som kan brukes både
          av enkeltpersoner og team. Fokus ligger på tydelighet, kvalitet og
          enkel bruk – ikke på støy og unødvendig kompleksitet.
        </p>

        <section className="intro-grid">
          <div className="intro-card">
            <h3>Manage Progress</h3>
            <p>
              Fremdriftsverktøy for prosjekter – fra små interne oppgaver til
              større leveranser. Hjelper deg å strukturere faser, aktiviteter og
              avhengigheter uten å miste oversikten.
            </p>
            <p style={{ marginTop: "0.6rem" }}>
              <Link to="/produkter/manage-progress">
                Les mer om Manage Progress →
              </Link>
            </p>
          </div>

          <div className="intro-card">
            <h3>Manage Documents</h3>
            <p>
              Planlagt modul for dokumenter, tegninger og beslutninger. Målet er
              å samle dokumentasjon og kontekst på ett sted, tett koblet mot
              fremdriften i prosjektene.
            </p>
            <p style={{ marginTop: "0.6rem" }}>
              <Link to="/produkter/manage-documents">
                Se planene for Manage Documents →
              </Link>
            </p>
          </div>

          <div className="intro-card">
            <h3>Digital Formelsamling</h3>
            <p>
              En digital formelsamling og referanse for tekniske beregninger.
              Utvikles videre som en del av plattformen og vil etter hvert bli
              tilgjengelig som eget produkt.
            </p>
            <p style={{ marginTop: "0.6rem" }}>
              <Link to="/produkter/formelsamling">
                Les mer om Formelsamlingen →
              </Link>
            </p>
          </div>
        </section>
      </section>

      {/* SEKSJON: TJENESTER FOR BEDRIFTER */}
      <section style={{ marginTop: "3rem" }}>
        <h2 style={{ marginBottom: "0.4rem" }}>Digitale verktøy på bestilling</h2>
        <p
          style={{
            marginTop: 0,
            marginBottom: "1rem",
            maxWidth: "720px",
            color: "var(--mcl-text-dim)",
            lineHeight: 1.6,
          }}
        >
          I tillegg til egne produkter kan vi hjelpe bedrifter som trenger sine
          egne, praktiske verktøy. Det kan være alt fra små interne løsninger
          til mer omfattende systemer som støtter prosjekter, kvalitet eller
          dokumentasjon.
        </p>

        <div
          className="intro-grid"
          style={{ marginBottom: "0.5rem", marginTop: "0.8rem" }}
        >
          <div className="intro-card">
            <h3>Fra Excel til app</h3>
            <p>
              Mange virksomheter har viktige verktøy gjemt i regneark:
              kalkyler, sjekklister, maler og skjema. Vi kan hjelpe med å gjøre
              slike løsninger om til robuste, brukervennlige apper som tåler
              daglig bruk – uten at malene blir ødelagt underveis.
            </p>
          </div>

          <div className="intro-card">
            <h3>Digitale arbeidsflyter</h3>
            <p>
              Har dere manuelle prosesser som egentlig burde vært digitale? Vi
              kan modellere arbeidsflyten og bygge en enkel løsning rundt den,
              slik at informasjon ikke forsvinner på e-post, i innbokser eller
              tilfeldige filer.
            </p>
          </div>

          <div className="intro-card">
            <h3>Verktøy tilpasset hverdagen</h3>
            <p>
              I stedet for generelle “one size fits all”-systemer bygger vi
              verktøy som er tilpasset hvordan dere faktisk jobber. Du har
              direkte kontakt med den som designer og utvikler verktøyet – uten
              unødvendige mellomledd.
            </p>
          </div>
        </div>

        <p
          style={{
            marginTop: "0.4rem",
            maxWidth: "700px",
            color: "var(--mcl-text-dim)",
            lineHeight: 1.6,
          }}
        >
          Hvis du har en idé, et eksisterende regneark eller en utfordring du
          tror kan løses med et digitalt verktøy, tar jeg gjerne en uforpliktende
          prat.
        </p>

        <p style={{ marginTop: "0.6rem" }}>
          <Link to="/kontakt" className="hero-cta">
            Ta kontakt om et prosjekt →
          </Link>
        </p>
      </section>

      {/* SEKSJON: HVORDAN VI TENKER */}
      <section style={{ marginTop: "3rem" }}>
        <h2 style={{ marginBottom: "0.4rem" }}>Hvordan vi jobber</h2>
        <p
          style={{
            marginTop: 0,
            marginBottom: "0.8rem",
            maxWidth: "720px",
            color: "var(--mcl-text-dim)",
            lineHeight: 1.6,
          }}
        >
          Morning Coffee Labs bygger digitale verktøy med samme tankegang som
          godt håndverk: det skal være tydelig, funksjonelt og til å stole på.
          Erfaring fra praktiske fag, prosjektarbeid og tverrfaglige leveranser
          gjør at vi kjenner både krav til kvalitet, dokumentasjon og samarbeid
          på tvers av roller.
        </p>
        <p
          style={{
            marginTop: 0,
            maxWidth: "720px",
            color: "var(--mcl-text-dim)",
            lineHeight: 1.6,
          }}
        >
          Dette er ikke et stort byrå med mange lag og kjølige prosesser. Det er
          et lite verksted for digitale verktøy, der målet er enkelt: å lage
          løsninger som faktisk hjelper folk i arbeidshverdagen.
        </p>
      </section>
    </main>
  );
};

export default HomePage;
