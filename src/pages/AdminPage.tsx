import React from "react";
import { Link } from "react-router-dom";

const AdminPage: React.FC = () => {
  return (
    <main className="page page-admin">
      <h1>Adminpanel</h1>

      <nav>
        <ul>
          <li><Link to="/admin/dashboard">Dashboard</Link></li>
          <li><Link to="/admin/kunder">Kunder</Link></li>
          <li><Link to="/admin/lisenser">Lisenser</Link></li>
          <li><Link to="/admin/meldinger">Meldinger</Link></li>
          <li><Link to="/admin/statistikk">Statistikk</Link></li>
        </ul>
      </nav>
    </main>
  );
};

export default AdminPage;
