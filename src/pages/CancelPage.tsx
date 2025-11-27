import React from "react";
import { Link } from "react-router-dom";

const CancelPage: React.FC = () => {
  return (
    <main className="page page-cancel">
      <h1>Betaling avbrutt</h1>
      <p>Du kan prøve igjen senere.</p>
      <Link to="/produkter/formelsamling">Tilbake til Formelsamling</Link>
    </main>
  );
};

export default CancelPage;
