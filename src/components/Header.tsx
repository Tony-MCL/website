import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          Morning Coffee Labs
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <nav className={`nav ${open ? "open" : ""}`}>
          <NavLink to="/" end>
            Hjem
          </NavLink>

          {/* PRODUKTER */}
          <NavLink to="/produkter/manage-progress">
            Manage Progress
          </NavLink>

          <NavLink to="/produkter/manage-documents">
            Manage Documents
          </NavLink>

          {/* Formelsamling og Idebank er fjernet fra menyen */}
          {/* <NavLink to="/produkter/formelsamling">Formelsamling</NavLink>
          <NavLink to="/idebank">Idebank</NavLink> */}

          <NavLink to="/om">Om</NavLink>
          <NavLink to="/kontakt">Kontakt</NavLink>

          {/* Admin holdes tilgjengelig, men kun i menyen — dette er normalt */}
          <NavLink to="/admin">Admin</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
