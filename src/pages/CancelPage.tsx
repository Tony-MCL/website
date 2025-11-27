import React from "react";
import { Link } from "react-router-dom";

const CancelPage: React.FC = () => {
  return (
    <main className="page status-page">
      <section className="status-card status-cancel">
        <h1>Betaling ble avbrutt</h1>
        <p className="status-lead">
          Det ser ut som om betalingen ikke ble fullført. Ingen beløp er
          trukket.
        </p>

        <p>
          Hvis du avbrøt bevisst, er det selvfølgelig helt i orden. Hvis det
          var et teknisk problem eller du vil prøve igjen, kan du gå tilbake
          til produktsiden og starte kjøpet på nytt.
        </p>

        <div className="status-actions">
          <Link to="/produkter/formelsamling" className="status-button">
            Tilbake til Formelsamlingen
          </Link>
          <Link to="/" className="status-link">
            Gå til forsiden →
          </Link>
        </div>
      </section>
    </main>
  );
};

export default CancelPage;
