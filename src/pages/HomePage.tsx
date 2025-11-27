import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <main className="page home-page">

      {/* HERO */}
      <section className="hero">
        <h1 className="hero-title">Morning Coffee Labs</h1>

        <p className="hero-tagline">
          Digitale verktøy bygget for elektro, automasjon og prosjektering —
          laget for fagfolk, ikke for byråer.
        </p>

        <p className="hero-sub">
          Vår digitale Formelsamling er første produkt ut.  
          Den er utviklet fra bunnen av for bruk i felt og på kontor.
        </p>

        <Link to="/produkter/formelsamling" className="hero-cta">
          Les mer om Formelsamlingen →
        </Link>
      </section>

      {/* INTRO GRID */}
      <section className="intro-grid">

        <div className="intro-card">
          <h3>Praktiske verktøy</h3>
          <p>
            Vi bygger verktøy som løser ekte hverdagsproblemer i tekniske fag;
            ikke flashy apper, men solide løsninger som sparer tid.
          </p>
        </div>

        <div className="intro-card">
          <h3>Rett fra bransjen</h3>
          <p>
            Over 15 år i kraftverk, styring og automasjon danner grunnlaget for
            måten vi bygger tekniske apper og beregningsverktøy på.
          </p>
        </div>

        <div className="intro-card">
          <h3>MCL Plattformen</h3>
          <p>
            Fremtidige moduler inkluderer prosjektstyring, fremdrift,
            dokumentasjon, kalkulasjon og planlegging — med lisensstyring.
          </p>
        </div>

      </section>
    </main>
  );
};

export default HomePage;
