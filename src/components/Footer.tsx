import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-copy">
          Morning Coffee Labs © {year}
        </span>
        <nav className="footer-links">
          <Link to="/kjopsvilkar">Kjøpsvilkår</Link>
          <span>·</span>
          <Link to="/brukervilkar">Brukervilkår</Link>
          <span>·</span>
          <Link to="/personvern">Personvern</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
