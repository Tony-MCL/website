import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

type LicenseType = "trial" | "paid" | null;

type LicenseCounters = {
  total: number;
  trial: number;
  paid: number;
};

const Dashboard: React.FC = () => {
  const [messageCount, setMessageCount] = useState<number | null>(null);
  const [ideaCount, setIdeaCount] = useState<number | null>(null);
  const [licenseCounts, setLicenseCounts] = useState<LicenseCounters | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        // Kontaktmeldinger
        const messagesSnap = await getDocs(collection(db, "contactMessages"));
        setMessageCount(messagesSnap.size);

        // Ideer
        const ideasSnap = await getDocs(collection(db, "ideas"));
        setIdeaCount(ideasSnap.size);

        // Lisenser – teller total, trial og paid
        const licensesSnap = await getDocs(collection(db, "licenses"));

        let total = 0;
        let trial = 0;
        let paid = 0;

        licensesSnap.forEach((docSnap) => {
          total += 1;
          const data = docSnap.data() as any;

          let licenseType: LicenseType = null;

          if (data.licenseType === "trial" || data.licenseType === "paid") {
            licenseType = data.licenseType;
          } else if (data.isTrial === true) {
            licenseType = "trial";
          } else if (data.isTrial === false) {
            licenseType = "paid";
          }

          if (licenseType === "trial") {
            trial += 1;
          } else if (licenseType === "paid") {
            paid += 1;
          } else {
            // Hvis vi ikke vet hva det er, regnes det kun som "total".
          }
        });

        setLicenseCounts({ total, trial, paid });
      } catch (err: any) {
        console.error("Feil ved henting av dashboard-data:", err);
        setError(
          err?.message ||
            "Kunne ikke hente dashboard-data. Sjekk konsollen for detaljer."
        );
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <main className="page admin-dashboard">
      <h1>Admin – oversikt</h1>
      <p>
        Her ser du nøkkeltall for meldinger, ideer og lisenser fra MCL-nettsiden.
      </p>

      {error && <p className="admin-error">{error}</p>}

      <section className="admin-summary-grid">
        <div className="admin-summary-card">
          <h2>Meldinger</h2>
          <p className="admin-summary-value">
            {messageCount === null ? "…" : messageCount}
          </p>
          <p className="admin-summary-label">
            Antall kontaktmeldinger i Firestore.
          </p>
        </div>

        <div className="admin-summary-card">
          <h2>Ideer</h2>
          <p className="admin-summary-value">
            {ideaCount === null ? "…" : ideaCount}
          </p>
          <p className="admin-summary-label">
            Antall innsendte ideer via idebanken.
          </p>
        </div>

        <div className="admin-summary-card">
          <h2>Lisenser totalt</h2>
          <p className="admin-summary-value">
            {licenseCounts === null ? "…" : licenseCounts.total}
          </p>
          <p className="admin-summary-label">
            Alle lisenser (prøve + betalte) i{" "}
            <code>licenses</code>-samlingen.
          </p>
        </div>

        <div className="admin-summary-card">
          <h2>Gratis prøver</h2>
          <p className="admin-summary-value">
            {licenseCounts === null ? "…" : licenseCounts.trial}
          </p>
          <p className="admin-summary-label">
            Lisenser der <code>licenseType = "trial"</code> (eller{" "}
            <code>isTrial = true</code>).
          </p>
        </div>

        <div className="admin-summary-card">
          <h2>Betalte lisenser</h2>
          <p className="admin-summary-value">
            {licenseCounts === null ? "…" : licenseCounts.paid}
          </p>
          <p className="admin-summary-label">
            Lisenser der <code>licenseType = "paid"</code> (eller{" "}
            <code>isTrial = false</code>).
          </p>
        </div>
      </section>

      <section className="admin-sub-section">
        <h2>Detaljer</h2>
        <p>
          Bruk menyen øverst for å se fullstendige lister:
          <br />
          <strong>Meldinger</strong> for innhold i kontaktmeldinger,
          <strong> Ideer</strong> for idebanken, og <strong>Lisenser</strong>{" "}
          for detaljert oversikt over prøveperioder og betalte lisenser.
        </p>
      </section>
    </main>
  );
};

export default Dashboard;
