import React from "react";

const AboutPage: React.FC = () => {
  return (
    <main className="page about-page">
      <section className="about-hero">
        <h1>Om Morning Coffee Labs</h1>
        <p className="about-tagline">
          Morning Coffee Labs bygger digitale verktøy for elektro, automasjon
          og tekniske fag. Målet er å gjøre hverdagen enklere for fagfolk med
          praktiske apper, beregningsverktøy og smarte moduler.
        </p>
      </section>

      <section className="about-section">
        <h2>Bakgrunn</h2>
        <p>
          Prosjektet drives av en fagperson med lang erfaring fra kraftverk,
          styringssystemer og tekniske leveranser. Mange av verktøyene som
          finnes i dag er enten tungvinte, utdaterte eller laget for helt andre
          bruksområder. Morning Coffee Labs ble startet for å bygge bedre
          alternativer.
        </p>
      </section>

      <section className="about-section">
        <h2>Hva vi bygger</h2>
        <p>
          Vi fokuserer på verktøy som brukes i hverdagen: beregninger, planer,
          dokumentasjon og oversikt. Alt utvikles med en konsekvent MCL-design,
          mørkt tema og enkel, profesjonell brukeropplevelse.
        </p>
        <ul>
          <li>Digital Formelsamling – første modul i plattformen</li>
          <li>Progress – fremdriftsverktøy for prosjekter (kommer)</li>
          <li>Flere verktøy og moduler i planlegging</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Videre retning</h2>
        <p>
          Nettsiden du ser nå er første versjon av MCL-plattformen. I neste
          steg kommer språkstøtte, CMS, brukere, prosjektoversikt, rapporter og
          lisensmoduler. Målet er å levere moderne, gjennomførte verktøy som
          passer inn i arbeidshverdagen – ikke forstyrrer den.
        </p>
      </section>

      <section className="about-section">
        <h2>Kontakt</h2>
        <p>
          Har du en idé, ønsker samarbeid eller har lyst til å teste verktøyene
          i et prosjekt? Ta gjerne kontakt. Jeg setter stor pris på all
          tilbakemelding som hjelper plattformen videre.
        </p>
      </section>
    </main>
  );
};

export default AboutPage;
