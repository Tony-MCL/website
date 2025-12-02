import React, { useState } from "react";
import { Link } from "react-router-dom";
import CheckoutButton from "../components/CheckoutButton";

type ProductKey = "formelsamling" | "progress" | "befaring";

type ProductConfig = {
  key: ProductKey;
  name: string;
  description: string;
  available: boolean;
};

const PRODUCTS: ProductConfig[] = [
  {
    key: "formelsamling",
    name: "Digital Formelsamling",
    description:
      "Full tilgang til beregninger for elektro, kraft og automasjon – bygget for bruk på kontor og i felt.",
    available: true,
  },
  {
    key: "progress",
    name: "ManageProgress",
    description: "Planlegging og fremdriftsstyring (kommer senere).",
    available: false,
  },
  {
    key: "befaring",
    name: "Befaringsappen",
    description: "Strukturert befaring, bilder og notater (kommer senere).",
    available: false,
  },
];

const LicenseStartPage: React.FC = () => {
  const [selectedProduct, setSelectedProduct] =
    useState<ProductKey>("formelsamling");

  const currentProduct = PRODUCTS.find((p) => p.key === selectedProduct)!;

  return (
    <main className="page formelsamling-page">
      <section className="fs-hero">
        <h1>Kjøp lisens</h1>
        <p className="fs-tagline">
          Velg produkt og varighet for lisensen din. Betalingen håndteres av
          Stripe, og lisensen aktiveres automatisk når du kommer tilbake hit.
        </p>
      </section>

      <section className="fs-layout">
        {/* Venstre side: produktvalg og forklaring */}
        <div className="fs-main">
          <section className="fs-section">
            <h2>1. Velg produkt</h2>
            <p>
              Start med å velge hvilket MCL-produkt du vil kjøpe lisens til.
              Foreløpig er Digital Formelsamling tilgjengelig, mens de andre
              produktene kommer senere.
            </p>

            <div>
              {PRODUCTS.map((product) => {
                const isActive = product.key === selectedProduct;
                const disabled = !product.available;

                return (
                  <button
                    key={product.key}
                    type="button"
                    className="fs-product-card"
                    onClick={() =>
                      !disabled && setSelectedProduct(product.key)
                    }
                    disabled={disabled}
                    style={
                      isActive
                        ? {
                            borderColor: "var(--mcl-accent)",
                            boxShadow: "0 0 0 1px var(--mcl-accent-soft)",
                          }
                        : undefined
                    }
                  >
                    <h3>{product.name}</h3>
                    <p className="fs-product-lead">{product.description}</p>
                    {!product.available && (
                      <span className="fs-badge">Kommer snart</span>
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="fs-section">
            <h2>2. Velg modell og varighet</h2>
            <p>
              Du kan velge mellom abonnement (fornyes automatisk) eller
              tidsbegrenset engangslisens. Stripe håndterer selve betalingen, og
              du kan si opp abonnementet når som helst.
            </p>

            <p className="fs-note">
              Når betalingen er gjennomført, blir du sendt tilbake til
              lisens-siden vår som henter lisens-token fra Stripe og aktiverer
              lisensen automatisk på denne enheten.
            </p>
          </section>

          <section className="fs-section">
            <h2>3. Etter kjøp</h2>
            <ul>
              <li>Du sendes til «Lisens aktivert»-siden etter betaling.</li>
              <li>Lisens-token lagres i nettleseren din.</li>
              <li>
                Når du åpner appen (f.eks. Formelsamling), vil PRO aktiveres
                uten ekstra steg.
              </li>
            </ul>
          </section>
        </div>

        {/* Høyre side: pris-/lisenskort */}
        <aside>
          <section className="fs-licensing">
            <h4>Lisens for: {currentProduct.name}</h4>
            <p>
              {currentProduct.description}
              {!currentProduct.available && " (kommer snart)"}
            </p>

            <div className="fs-license-grid">
              {/* Abonnement – månedlig */}
              <div className="fs-license-card">
                <p className="fs-license-label">Abonnement – per måned</p>
                <p>
                  Passer hvis du vil teste ut løsningen i prosjektperioder, eller
                  vil ha full fleksibilitet.
                </p>
                <ul>
                  <li>Fornyes automatisk hver måned</li>
                  <li>Avslutt når som helst i Stripe / via oss</li>
                </ul>
                <CheckoutButton
                  product={selectedProduct}
                  billingPeriod="month"
                  autoRenew={true}
                  label="Kjøp månedlig abonnement"
                />
              </div>

              {/* Abonnement – årlig */}
              <div className="fs-license-card">
                <p className="fs-license-label">Abonnement – per år</p>
                <p>
                  For deg som vet at du vil bruke verktøyet gjennom hele året og
                  vil ha forutsigbare kostnader.
                </p>
                <ul>
                  <li>Fornyes automatisk årlig</li>
                  <li>Planlagt mulighet for volumrabatter</li>
                </ul>
                <CheckoutButton
                  product={selectedProduct}
                  billingPeriod="year"
                  autoRenew={true}
                  label="Kjøp årlig abonnement"
                />
              </div>

              {/* Engangslisens – 1 måned */}
              <div className="fs-license-card">
                <p className="fs-license-label">Engangslisens – 1 måned</p>
                <p>
                  For kortvarige behov, f.eks. et konkret prosjekt eller
                  eksamensperiode.
                </p>
                <ul>
                  <li>Gjelder i én måned fra kjøpsdato</li>
                  <li>Fornyes ikke automatisk</li>
                </ul>
                <CheckoutButton
                  product={selectedProduct}
                  billingPeriod="month"
                  autoRenew={false}
                  label="Kjøp 1 måneds lisens (engang)"
                />
              </div>

              {/* Engangslisens – 1 år */}
              <div className="fs-license-card">
                <p className="fs-license-label">Engangslisens – 1 år</p>
                <p>
                  For deg som ønsker å kjøpe en tidsbegrenset lisens uten
                  automatisk fornyelse.
                </p>
                <ul>
                  <li>Gjelder i ett år fra kjøpsdato</li>
                  <li>Ingen automatisk fornyelse</li>
                </ul>
                <CheckoutButton
                  product={selectedProduct}
                  billingPeriod="year"
                  autoRenew={false}
                  label="Kjøp 1 års lisens (engang)"
                />
              </div>
            </div>

            <p className="fs-note">
              Prisene settes og håndteres i Stripe. Ved senere behov for
              volum-/team-lisenser kan vi utvide modellen uten å endre denne
              siden for sluttbruker.
            </p>
          </section>

          <section className="fs-access">
            <h2>Allerede kjøpt lisens?</h2>
            <p>
              Hvis du allerede har kjøpt lisens og likevel havnet her, kan du
              bare åpne appen direkte. Lisens-token ligger lagret i nettleseren
              så lenge du ikke har slettet nettleserdata.
            </p>
            <Link to="/produkter/formelsamling" className="status-link">
              Til produktsiden for Formelsamling →
            </Link>
          </section>
        </aside>
      </section>
    </main>
  );
};

export default LicenseStartPage;
