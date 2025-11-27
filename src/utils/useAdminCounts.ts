import { useEffect, useState } from "react";
import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "../firebase";

export const useAdminCounts = () => {
  const [ideas, setIdeas] = useState<number>(0);
  const [messages, setMessages] = useState<number>(0);
  const [licenses, setLicenses] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        const ideasSnap = await getCountFromServer(collection(db, "ideas"));
        const messagesSnap = await getCountFromServer(collection(db, "messages"));

        // Lisenser er placeholder — tom count hvis collection ikke finnes
        let licenseCount = 0;
        try {
          const licSnap = await getCountFromServer(collection(db, "licenses"));
          licenseCount = licSnap.data().count;
        } catch {
          licenseCount = 0;
        }

        setIdeas(ideasSnap.data().count);
        setMessages(messagesSnap.data().count);
        setLicenses(licenseCount);
      } catch (err: any) {
        setError("Kunne ikke hente tall fra Firestore.");
        console.error(err);
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
    loading,
    error,
  };
};
