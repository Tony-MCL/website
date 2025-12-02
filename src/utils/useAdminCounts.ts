import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../src/firebase";

export const useAdminCounts = () => {
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({
    messages: 0,
    ideas: 0,
    licenses: 0,
    trialSignups: 0,
  });

  useEffect(() => {
    const loadCounts = async () => {
      try {
        setLoading(true);

        const messagesSnap = await getDocs(collection(db, "contactMessages"));
        const ideasSnap = await getDocs(collection(db, "ideas"));

        let licensesCount = 0;
        try {
          const licensesSnap = await getDocs(collection(db, "licenses"));
          licensesCount = licensesSnap.size;
        } catch (err) {
          console.warn("Kunne ikke hente licenses:", err);
        }

        let trialsCount = 0;
        try {
          const trialsSnap = await getDocs(collection(db, "trialSignups"));
          trialsCount = trialsSnap.size;
        } catch (err) {
          console.warn("Kunne ikke hente trialSignups:", err);
        }

        setCounts({
          messages: messagesSnap.size,
          ideas: ideasSnap.size,
          licenses: licensesCount,
          trialSignups: trialsCount,
        });
      } catch (error) {
        console.error("Feil i useAdminCounts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCounts();
  }, []);

  return { loading, counts };
};
