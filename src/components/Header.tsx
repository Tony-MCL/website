import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const logoUrl = new URL("mcl-logo.png", import.meta.env.BASE_URL).href;

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
          <Link
            className={
              isActive("/produkter/formelsamling") ? "active" : ""
            }
            to="/produkter/formelsamling"
          >
            Formelsamling
          </Link>
          <Link className={isActive("/idebank") ? "active" : ""} to="/idebank">
            Idebank
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
          <Link className={isActive("/admin") ? "active" : ""} to="/admin">
            Admin
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
        <Link to="/produkter/formelsamling" onClick={closeMenu}>
          Formelsamling
        </Link>
        <Link to="/idebank" onClick={closeMenu}>
          Idebank
        </Link>
        <Link to="/om" onClick={closeMenu}>
          Om
        </Link>
        <Link to="/kontakt" onClick={closeMenu}>
          Kontakt
        </Link>
        <Link to="/admin" onClick={closeMenu}>
          Admin
        </Link>
      </div>
    </>
  );
};

export default Header;
