import React from "react";
import { Link } from "react-router-dom";

const SuccessPage: React.FC = () => {
  return (
    <main className="page page-success">
      <h1>Takk for kjøpet!</h1>
      <p>Betalingen ble fullført.</p>
      <Link to="/produkter/formelsamling">Tilbake til produktsiden</Link>
    </main>
  );
};

export default SuccessPage;
