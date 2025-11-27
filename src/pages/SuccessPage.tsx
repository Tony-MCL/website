import React from "react";
import { Link } from "react-router-dom";

const SuccessPage: React.FC = () => {
  return (
    <main className="page status-page">
      <section className="status-card status-success">
        <h1>Takk for kjøpet! ✅</h1>
        <p className="status-lead">
          Betalingen ble registrert, og lisensen for Formelsamlingen er nå
          aktivert i Stripe-systemet.
        </p>

        <p>
          Du vil motta kvittering og informasjon knyttet til lisensen på
          e-posten du brukte i kjøpet. Dersom noe ser feil ut, er det bare å
          ta kontakt.
        </p>

        <div className="status-actions">
          <Link to="/produkter/formelsamling" className="status-button">
            Tilbake til Formelsamlingen
          </Link>
          <Link to="/kontakt" className="status-link">
            Kontakt oss hvis du trenger hjelp →
          </Link>
        </div>
      </section>
    </main>
  );
};

export default SuccessPage;
