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
  const [trialSignupCount, setTrialSignupCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Meldinger fra nettsiden
        const messagesSnap = await getDocs(collection(db, "contactMessages"));
        setMessageCount(messagesSnap.size);

        // Idebank
        const ideasSnap = await getDocs(collection(db, "ideas"));
        setIdeaCount(ideasSnap.size);

        // Betalte lisenser + evt. trial-lisenser i "licenses"
        let total = 0;
        let trial = 0;
        let paid = 0;

        try {
          const licensesSnap = await getDocs(collection(db, "licenses"));
          total = licensesSnap.size;

          licensesSnap.forEach((docSnap) => {
            const data: any = docSnap.data();

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
              // Ukjent type – teller kun i total.
            }
          });
        } catch (err) {
          console.warn("Kunne ikke hente licenses:", err);
        }

        setLicenseCounts({ total, trial, paid });

        // Gratis prøveperioder i trialSignups
        try {
          const trialSnap = await getDocs(collection(db, "trialSignups"));
          setTrialSignupCount(trialSnap.size);
        } catch (err) {
          console.warn("Kunne ikke hente trialSignups:", err);
          setTrialSignupCount(0);
        }
      } catch (error) {
        console.error("Feil ved henting av dashboard-data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <main className="page admin-page">
      <section className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>
          Rask oversikt over meldinger, ideer, lisenser og gratis prøveperioder
          på tvers av MCL-plattformen.
        </p>
      </section>

      {loading ? (
        <p>Laster data…</p>
      ) : (
        <section className="admin-cards">
          {/* Meldinger */}
          <div className="admin-card">
            <h2>Meldinger</h2>
            <p className="admin-card-number">
              {messageCount !== null ? messageCount : "-"}
            </p>
            <p>Kontaktmeldinger sendt via nettsiden</p>
          </div>

          {/* Idebank */}
          <div className="admin-card">
            <h2>Ideer</h2>
            <p className="admin-card-number">
              {ideaCount !== null ? ideaCount : "-"}
            </p>
            <p>Innspill og idéforslag lagret i idebanken</p>
          </div>

          {/* Lisenser */}
          <div className="admin-card">
            <h2>Lisenser</h2>
            <p className="admin-card-number">
              {licenseCounts ? licenseCounts.total : "-"}
            </p>
            <p>
              Betalte lisenser (og evt. trial-lisenser) registrert i{" "}
              <code>licenses</code>
            </p>
            {licenseCounts && (
              <p className="admin-card-meta">
                Trial: {licenseCounts.trial} &nbsp;•&nbsp; Betalt:{" "}
                {licenseCounts.paid}
              </p>
            )}
          </div>

          {/* Gratis prøveperioder */}
          <div className="admin-card">
            <h2>Prøveperioder</h2>
            <p className="admin-card-number">
              {trialSignupCount !== null ? trialSignupCount : "-"}
            </p>
            <p>Registrerte trial-starts i Formelsamlingen</p>
          </div>
        </section>
      )}

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
