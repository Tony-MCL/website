import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <main className="page home-page">
      {/* HERO */}
      <section className="hero">
        <h1 className="hero-title">Morning Coffee Labs</h1>

        <p className="hero-tagline">
          Vi bygger digitale verktøy som gjør prosjekthverdagen enklere.
        </p>

        <p className="hero-sub" style={{ maxWidth: 820 }}>
          Vårt første produkt er <strong>Manage Progress</strong> – et praktisk
          fremdriftsverktøy for folk som faktisk jobber i prosjekter. Enkelt å
          komme i gang med, og laget for oversikt, struktur og gjennomføring –
          uten unødvendig kompleksitet.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem" }}>
          <Link to="/progress" className="hero-cta">
            Se priser og kjøp Progress →
          </Link>
          <Link
            to="/kontakt"
            style={{
              alignSelf: "center",
              fontSize: "0.95rem",
              textDecoration: "underline",
            }}
          >
            Spørsmål? Ta kontakt →
          </Link>
        </div>
      </section>

      {/* HVA ER PROGRESS */}
      <section style={{ marginTop: "2.5rem" }}>
        <h2 style={{ marginBottom: "0.4rem" }}>Hva er Manage Progress?</h2>
        <p
          style={{
            marginTop: 0,
            maxWidth: "820px",
            color: "var(--mcl-text-dim)",
            lineHeight: 1.6,
          }}
        >
          Manage Progress er laget for deg som vil planlegge, følge opp og
          kommunisere fremdrift – uten å drukne i tunge systemer. Det passer
          like godt for små interne prosjekter som for større leveranser, der
          det er mange oppgaver og avhengigheter å holde kontroll på.
        </p>

        <section className="intro-grid" style={{ marginTop: "1rem" }}>
          <div className="intro-card">
            <h3>Oversikt</h3>
            <p>
              Samle aktiviteter, datoer og ansvar på ett sted, slik at både du
              og teamet ser hva som skjer – og hva som kommer.
            </p>
          </div>

          <div className="intro-card">
            <h3>Fremdrift</h3>
            <p>
              Følg utviklingen i prosjektet på en ryddig måte, og få bedre
              kontroll når planene endrer seg (for det gjør de).
            </p>
          </div>

          <div className="intro-card">
            <h3>Praktisk</h3>
            <p>
              Bygget med “digital verktøymaker”-tankegang: det skal være
              forståelig, funksjonelt og til å stole på – ikke bare pent i en demo.
            </p>
          </div>
        </section>

        <p style={{ marginTop: "1rem" }}>
          <Link to="/progress">Gå til priser og kjøp →</Link>
        </p>
      </section>

      {/* HVEM PASSER DET FOR */}
      <section style={{ marginTop: "3rem" }}>
        <h2 style={{ marginBottom: "0.4rem" }}>Hvem passer det for?</h2>
        <p
          style={{
            marginTop: 0,
            maxWidth: "820px",
            color: "var(--mcl-text-dim)",
            lineHeight: 1.6,
          }}
        >
          Manage Progress er laget for prosjektbasert arbeid – uansett bransje.
          Typisk for:
        </p>

        <section className="intro-grid" style={{ marginTop: "1rem" }}>
          <div className="intro-card">
            <h3>Små og mellomstore team</h3>
            <p>
              Team som trenger en enkel og tydelig måte å planlegge og følge opp
              arbeid – uten å innføre “et helt system”.
            </p>
          </div>

          <div className="intro-card">
            <h3>Prosjektledere og fagansvarlige</h3>
            <p>
              Når du må ha kontroll på helheten, samtidig som du er tett på
              leveransen og detaljene.
            </p>
          </div>

          <div className="intro-card">
            <h3>Alle som i dag bruker Excel</h3>
            <p>
              Når planlegging og oppfølging blir et lappeteppe av filer, kopier
              og “hvor var den siste versjonen igjen?”.
            </p>
          </div>
        </section>
      </section>

      {/* MCL + BYGG PÅ BESTILLING (tonet ned) */}
      <section style={{ marginTop: "3rem" }}>
        <h2 style={{ marginBottom: "0.4rem" }}>Morning Coffee Labs</h2>
        <p
          style={{
            marginTop: 0,
            maxWidth: "820px",
            color: "var(--mcl-text-dim)",
            lineHeight: 1.6,
          }}
        >
          Morning Coffee Labs er et lite verksted for digitale verktøy. Vi
          bygger produkter som tar utgangspunkt i virkelige arbeidsmåter – med
          fokus på kvalitet, dokumentasjon og samarbeid på tvers av roller.
        </p>

        <section className="intro-grid" style={{ marginTop: "1rem" }}>
          <div className="intro-card">
            <h3>Bygge på bestilling</h3>
            <p>
              Vi kan også hjelpe bedrifter med egne verktøy – for eksempel å gjøre
              Excel-baserte løsninger mer robuste, eller lage små systemer som
              støtter konkrete arbeidsflyter.
            </p>
            <p style={{ marginTop: "0.6rem" }}>
              <Link to="/tjenester">Les mer om hva vi kan tilby →</Link>
            </p>
          </div>

          <div className="intro-card">
            <h3>Kort vei til beslutning</h3>
            <p>
              Hos oss snakker du direkte med den som designer og bygger
              verktøyene. Det gir raske avklaringer og mindre friksjon.
            </p>
            <p style={{ marginTop: "0.6rem" }}>
              <Link to="/kontakt">Ta kontakt →</Link>
            </p>
          </div>

          <div className="intro-card">
            <h3>Digitale verktøymakere</h3>
            <p>
              Vi er stolte av å kalle oss digitale verktøymakere. Målet er
              alltid det samme: å gjøre arbeidshverdagen litt enklere – og
              prosjektene litt tryggere å styre.
            </p>
          </div>
        </section>
      </section>
    </main>
  );
};

export default HomePage;
