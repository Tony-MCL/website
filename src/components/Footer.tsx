import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="mcl-footer">
      <div className="footer-inner">

        {/* Venstre seksjon */}
        <div className="footer-col">
          <h4>Mathisens Morning Coffee Labs</h4>
          <p className="footer-small">© {new Date().getFullYear()} Alle rettigheter forbeholdt.</p>
        </div>

        {/* Midtseksjon: Juridiske lenker */}
        <div className="footer-col">
          <h4>Juridisk</h4>
          <ul className="footer-links">
            <li>
              <Link to="/kjopsvilkar">Kjøpsvilkår</Link>
            </li>
            <li>
              <Link to="/personvern">Personvern</Link>
            </li>
            <li>
              <Link to="/brukervilkar">Brukervilkår</Link>
            </li>
            <li>
              <Link to="/refusjon">Refusjon</Link>
            </li>
          </ul>
        </div>

        {/* Høyre seksjon: Kontakt */}
        <div className="footer-col">
          <h4>Kontakt</h4>
          <p className="footer-small">
            support@morningcoffeelabs.no
            <br />
            Norge
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
