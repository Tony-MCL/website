import React from "react";
import { Link } from "react-router-dom";

const AdminPage: React.FC = () => {
  const { ideas, messages, licenses, loading, error } = useAdminCounts();

  return (
    <main className="page admin-page">
      <section className="admin-header">
        <h1>Admin</h1>
        <p>Oversikt over innsendte idéer, meldinger og lisensstatus.</p>
      </section>

      {error && <p className="admin-error">{error}</p>}

      <section className="admin-stats">
        <div className="admin-stat-card">
          <h3>Idéer</h3>
          <p className="admin-stat-number">
            {loading ? "…" : ideas}
          </p>
          <Link to="/admin/meldinger" className="admin-stat-link">
            Se idéer →
          </Link>
        </div>

        <div className="admin-stat-card">
          <h3>Meldinger</h3>
          <p className="admin-stat-number">
            {loading ? "…" : messages}
          </p>
          <Link to="/admin/meldinger" className="admin-stat-link">
            Se meldinger →
          </Link>
        </div>

        <div className="admin-stat-card">
          <h3>Lisenser</h3>
          <p className="admin-stat-number">
            {loading ? "…" : licenses}
          </p>
          <Link to="/admin/lisenser" className="admin-stat-link">
            Se lisenser →
          </Link>
        </div>
      </section>

      <section className="admin-nav">
        <h2>Administrer</h2>

        <ul>
          <li>
            <Link to="/admin/kunder">Kunder</Link>
          </li>
          <li>
            <Link to="/admin/lisenser">Lisenser</Link>
          </li>
          <li>
            <Link to="/admin/meldinger">Meldinger</Link>
          </li>
          <li>
            <Link to="/admin/statistikk">Statistikk</Link>
          </li>
        </ul>
      </section>
    </main>
  );
};

export default AdminPage;
