import React from "react";
import { Link } from "react-router-dom";
import CheckoutButton from "../components/CheckoutButton";

const ProgressPage: React.FC = () => {
  return (
    <main className="page progress-page">
      <section className="fs-hero">
        <h1>Manage Progress</h1>
        <p className="fs-tagline">
          Et praktisk fremdriftsverktøy for prosjektbasert arbeid – laget for
          oversikt, struktur og gjennomføring.
        </p>

        <div style={{ marginTop: "1rem", display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
          <Link to="/" className="status-button" style={{ textDecoration: "none" }}>
            ← Tilbake til forsiden
          </Link>
          <Link to="/kontakt" className="status-button" style={{ textDecoration: "none" }}>
            Spørsmål? Kontakt oss →
          </Link>
        </div>
      </section>

      <section className="fs-layout">
        {/* VENSTRE: Introduksjon */}
        <div className="fs-main">
          <section className="fs-section">
            <h2>Rask oversikt</h2>
            <p>
              Progress hjelper deg å planlegge og følge opp prosjekter uten å
              gjøre ting vanskeligere enn de trenger å være. Fokus er praktisk
              bruk, tydelige data og en arbeidsflyt som tåler endringer.
            </p>
          </section>

          <section className="fs-section">
            <h2>Lisensmodell</h2>
            <p>
              Pro-lisens prises <strong>per bruker</strong>. Du velger månedlig
              eller årlig. Enterprise er planlagt for større behov og avtales
              separat.
            </p>
            <ul>
              <li>
                <strong>Pro månedlig:</strong> NOK 200,- per bruker / måned
              </li>
              <li>
                <strong>Pro årlig:</strong> NOK 2000,- per bruker / år
              </li>
              <li>
                <strong>Enterprise:</strong> på forespørsel (kontakt oss)
              </li>
            </ul>
            <p className="fs-note" style={{ marginTop: "0.9rem" }}>
              Betaling skjer via Stripe Checkout. Etter kjøp sendes du tilbake
              til nettsiden.
            </p>
          </section>

          <section className="fs-section">
            <h2>Planlagt for Enterprise</h2>
            <p>
              Enterprise er for virksomheter som ønsker egen avtale, tettere
              oppfølging og eventuelle tilpasninger.
            </p>
            <ul>
              <li>Avtale og pris etter behov</li>
              <li>Mulighet for tilpasninger og onboarding</li>
              <li>Supportopplegg tilpasset organisasjonen</li>
            </ul>

            <p style={{ marginTop: "0.8rem" }}>
              <Link to="/kontakt">Ta kontakt om Enterprise →</Link>
            </p>
          </section>
        </div>

        {/* HØYRE: Tiers + kjøp */}
        <aside className="fs-side">
          <div className="fs-product-card">
            <div className="fs-badge">Progress · Lansering</div>
            <h3>Velg lisens</h3>
            <p className="fs-product-lead">
              Kom i gang gratis. Oppgrader når du trenger flere muligheter.
            </p>

            <div className="fs-licensing" style={{ marginTop: "1rem" }}>
              <h4>Free</h4>
              <ul className="fs-product-list">
                <li>Kom i gang og test</li>
                <li>Grunnleggende bruk</li>
                <li>Bevisste begrensninger</li>
              </ul>
              <div className="fs-note" style={{ marginTop: "0.6rem" }}>
                Free er for å bli kjent med Progress. Når du trenger mer
                kapasitet og funksjonalitet, oppgraderer du til Pro.
              </div>
            </div>

            <div className="fs-licensing" style={{ marginTop: "1.1rem" }}>
              <h4>Pro</h4>
              <ul className="fs-product-list">
                <li>For aktiv bruk og team</li>
                <li>Flere prosjekter og bedre flyt</li>
                <li>Prioritert videreutvikling</li>
              </ul>

              <div style={{ marginTop: "1rem", display: "grid", gap: "0.7rem" }}>
                <CheckoutButton
                  product="progress"
                  billingPeriod="month"
                  autoRenew={true}
                  label="Kjøp Pro – månedlig (NOK 200)"
                />
                <CheckoutButton
                  product="progress"
                  billingPeriod="year"
                  autoRenew={true}
                  label="Kjøp Pro – årlig (NOK 2000)"
                />
              </div>

              <p className="fs-note" style={{ marginTop: "0.9rem" }}>
                Pro kjøpes per bruker. Trenger dere Enterprise, ta kontakt.
              </p>
            </div>

            <div className="fs-licensing" style={{ marginTop: "1.1rem" }}>
              <h4>Enterprise</h4>
              <p style={{ marginTop: "0.4rem" }}>
                For større behov og egen avtale.
              </p>
              <p style={{ marginTop: "0.6rem" }}>
                <Link to="/kontakt" className="status-button" style={{ textDecoration: "none" }}>
                  Kontakt oss om Enterprise →
                </Link>
              </p>
            </div>

            <div className="fs-note" style={{ marginTop: "1rem" }}>
              Ved kjøp gjelder våre vilkår og personvern.
              <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
                <Link to="/kjopsvilkar">Kjøpsvilkår</Link>
                <Link to="/brukervilkar">Brukervilkår</Link>
                <Link to="/personvern">Personvern</Link>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
};

export default ProgressPage;
