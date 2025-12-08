import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const assetBase = import.meta.env.BASE_URL || "/";
const logoUrl = `${assetBase}mcl-logo.png`;

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setOpen(false);
  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="header">
        <div className="header-logo">
          <Link to="/" onClick={closeMenu}>
            <img src={logoUrl} alt="Morning Coffee Labs" />
          </Link>
        </div>

        <nav className="header-nav">
          <Link className={isActive("/") ? "active" : ""} to="/">
            Hjem
          </Link>
          <Link className={isActive("/om") ? "active" : ""} to="/om">
            Om
          </Link>
          <Link
            className={isActive("/kontakt") ? "active" : ""}
            to="/kontakt"
          >
            Kontakt
          </Link>
        </nav>

        <div className="hamburger" onClick={() => setOpen((prev) => !prev)}>
          ☰
        </div>
      </header>

      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <Link to="/" onClick={closeMenu}>
          Hjem
        </Link>
        <Link to="/om" onClick={closeMenu}>
          Om
        </Link>
        <Link to="/kontakt" onClick={closeMenu}>
          Kontakt
        </Link>
      </div>
    </>
  );
};

export default Header;
