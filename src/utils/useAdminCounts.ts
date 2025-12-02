import { useEffect, useState } from "react";
import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "../firebase";

export const useAdminCounts = () => {
  const [ideas, setIdeas] = useState<number>(0);
  const [messages, setMessages] = useState<number>(0);
  const [licenses, setLicenses] = useState<number>(0);
  const [trialSignups, setTrialSignups] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        // Idéer
        const ideasSnap = await getCountFromServer(collection(db, "ideas"));
        const ideasCount = ideasSnap.data().count || 0;

        // Meldinger (samme collection som MessagesPage bruker)
        const messagesSnap = await getCountFromServer(
          collection(db, "messages")
        );
        const messagesCount = messagesSnap.data().count || 0;

        // Lisenser (kan være tom/ikke i bruk ennå)
        let licenseCount = 0;
        try {
          const licSnap = await getCountFromServer(collection(db, "licenses"));
          licenseCount = licSnap.data().count || 0;
        } catch (err) {
          console.warn("Kunne ikke hente licenses-count:", err);
          licenseCount = 0;
        }

        // Gratis prøveperioder (trialSignups fra Formelsamling)
        let trialCount = 0;
        try {
          const trialSnap = await getCountFromServer(
            collection(db, "trialSignups")
          );
          trialCount = trialSnap.data().count || 0;
        } catch (err) {
          console.warn("Kunne ikke hente trialSignups-count:", err);
          trialCount = 0;
        }

        setIdeas(ideasCount);
        setMessages(messagesCount);
        setLicenses(licenseCount);
        setTrialSignups(trialCount);
      } catch (err: any) {
        console.error("Feil i useAdminCounts:", err);
        setError(
          err?.message ||
            "Kunne ikke hente tall fra Firestore. Sjekk konsollen for detaljer."
        );
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return {
    ideas,
    messages,
    licenses,
    trialSignups,
    loading,
    error,
  };
};
