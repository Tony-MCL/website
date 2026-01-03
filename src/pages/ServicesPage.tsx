import React from "react";
import { Link } from "react-router-dom";

const ServicesPage: React.FC = () => {
  return (
    <main className="page services-page">
      <section className="fs-hero">
        <h1>Digitale verktøy på bestilling</h1>
        <p className="fs-tagline">
          Morning Coffee Labs kan også hjelpe bedrifter og enkeltpersoner med å
          utvikle egne digitale verktøy – små eller store, men alltid praktiske.
        </p>

        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            gap: "0.8rem",
            flexWrap: "wrap",
          }}
        >
          <Link
            to="/"
            className="status-button"
            style={{ textDecoration: "none" }}
          >
            ← Tilbake til forsiden
          </Link>
          <Link
            to="/kontakt"
            className="status-button"
            style={{ textDecoration: "none" }}
          >
            Ta kontakt →
          </Link>
        </div>
      </section>

      <section className="fs-layout">
        {/* HOVEDINNHOLD */}
        <div className="fs-main">
          <section className="fs-section">
            <h2>Hva vi kan hjelpe med</h2>
            <p>
              Vi bygger digitale verktøy med ett enkelt mål: å gjøre
              arbeidshverdagen enklere for de som faktisk skal bruke løsningen.
              Mange virksomheter sitter på gode rutiner og verktøy i form av
              Excel-maler, sjekklister og manuelle prosesser – og ofte er det
              nettopp der det finnes mest å hente.
            </p>
            <ul>
              <li>Pakke Excel-verktøy inn i en mer robust løsning</li>
              <li>Digitale sjekklister, skjema og arbeidsflyt</li>
              <li>Små systemer som samler informasjon på ett sted</li>
              <li>Videreutvikling av en idé til prototype eller produkt</li>
            </ul>
          </section>

          <section className="fs-section">
            <h2>Hvordan vi jobber</h2>
            <ol>
              <li>
                <strong>Vi forstår behovet:</strong> hvordan dere jobber i dag,
                og hvor friksjonen oppstår.
              </li>
              <li>
                <strong>Vi konkretiserer:</strong> hva verktøyet faktisk skal
                gjøre – og hva det ikke trenger å gjøre.
              </li>
              <li>
                <strong>Vi bygger stegvis:</strong> først en enkel versjon som
                kan testes i praksis, deretter forbedringer.
              </li>
            </ol>
            <p>
              Hos oss er det kort vei fra idé til beslutning, og direkte dialog
              med den som faktisk bygger løsningen.
            </p>
          </section>

          <section className="fs-section">
            <h2>Ta en prat</h2>
            <p>
              Har dere en idé, et regneark som “lever sitt eget liv”, eller en
              prosess som burde vært enklere? Vi tar gjerne en uforpliktende prat
              for å se om – og hvordan – det kan løses.
            </p>
            <p style={{ marginTop: "0.8rem" }}>
              <Link to="/kontakt">Kontakt oss →</Link>
            </p>
          </section>
        </div>

        {/* SIDEBAR */}
        <aside className="fs-side">
          {/* SAMARBEID */}
          <div className="fs-product-card">
            <div className="fs-badge">Samarbeid</div>
            <h3>Hvorfor dette fungerer</h3>
            <p className="fs-product-lead">
              Vi bygger som digitale verktøymakere: praktisk, ryddig og med fokus
              på kvalitet og bruk.
            </p>
            <ul className="fs-product-list">
              <li>Forstår prosjektarbeid og tverrfaglighet</li>
              <li>Bygger verktøy som tåler reell bruk</li>
              <li>Enkelt å komme i gang, lett å videreutvikle</li>
            </ul>

            <div className="fs-note" style={{ marginTop: "0.9rem" }}>
              Ønsker du først å se produktet vårt?
              <div style={{ marginTop: "0.6rem" }}>
                <Link to="/progress">Se Progress →</Link>
              </div>
            </div>
          </div>

          {/* IDÉBANK */}
          <div className="fs-product-card" style={{ marginTop: "1.2rem" }}>
            <div className="fs-badge">Idébanken</div>
            <h3>Har du en idé?</h3>
            <p className="fs-product-lead">
              Sitter du på en idé du gjerne skulle sett komme til live, men
              mangler midler eller kapasitet til å realisere den alene?
            </p>
            <p>
              Vår idébank er en måte å samle slike idéer på. Noen kan bli videre
              utviklet i samarbeid, andre kan danne grunnlag for nye digitale
              verktøy eller produkter over tid.
            </p>
            <p style={{ marginTop: "0.6rem" }}>
              <Link to="/kontakt">
                Ta kontakt om en idé →
              </Link>
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
};

export default ServicesPage;
