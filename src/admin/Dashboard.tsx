import React from "react";
import { useAdminCounts } from "../utils_useAdminCounts";

const Dashboard: React.FC = () => {
  const { loading, counts } = useAdminCounts();

  return (
    <main className="page admin-page">
      <section className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Oversikt over systemaktivitet på tvers av MCL-plattformen.</p>
      </section>

      {loading ? (
        <p>Laster data…</p>
      ) : (
        <section className="admin-cards">
          {/* Meldinger */}
          <div className="admin-card">
            <h2>Meldinger</h2>
            <p className="admin-card-number">{counts.messages}</p>
            <p>Kontaktmeldinger sendt via nettsiden</p>
          </div>

          {/* Idebank */}
          <div className="admin-card">
            <h2>Ideer</h2>
            <p className="admin-card-number">{counts.ideas}</p>
            <p>Innspill og idéforslag</p>
          </div>

          {/* Betalte lisenser */}
          <div className="admin-card">
            <h2>Lisenser</h2>
            <p className="admin-card-number">{counts.licenses}</p>
            <p>Betalte lisenser registrert i systemet</p>
          </div>

          {/* Gratis prøver */}
          <div className="admin-card">
            <h2>Prøveperioder</h2>
            <p className="admin-card-number">{counts.trialSignups}</p>
            <p>Aktive / registrerte trial-starts</p>
          </div>
        </section>
      )}
    </main>
  );
};

export default Dashboard;
