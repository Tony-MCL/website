import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="header">
        <div className="header-logo">
          <Link to="/">
            <img src="/mcl-logo.png" alt="Morning Coffee Labs" />
          </Link>
        </div>

        <nav className="header-nav">
          <Link to="/">Hjem</Link>
          <Link to="/produkter/formelsamling">Formelsamling</Link>
          <Link to="/idebank">Idebank</Link>
          <Link to="/om">Om</Link>
          <Link to="/kontakt">Kontakt</Link>
          <Link to="/admin">Admin</Link>
        </nav>

        <div
          className="hamburger"
          onClick={() => setOpen((prev) => !prev)}
        >
          ☰
        </div>
      </header>

      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <Link to="/" onClick={() => setOpen(false)}>Hjem</Link>
        <Link to="/produkter/formelsamling" onClick={() => setOpen(false)}>Formelsamling</Link>
        <Link to="/idebank" onClick={() => setOpen(false)}>Idebank</Link>
        <Link to="/om" onClick={() => setOpen(false)}>Om</Link>
        <Link to="/kontakt" onClick={() => setOpen(false)}>Kontakt</Link>
        <Link to="/admin" onClick={() => setOpen(false)}>Admin</Link>
      </div>
    </>
  );
};

export default Header;
