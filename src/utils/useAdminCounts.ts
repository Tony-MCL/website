import { useEffect, useState } from "react";
import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "../firebase";

type AdminCounts = {
  ideas: number;
  messages: number;
  licenses: number;
};

export const useAdminCounts = () => {
  const [ideas, setIdeas] = useState<number>(0);
  const [messages, setMessages] = useState<number>(0);
  const [licenses, setLicenses] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCounts = async () => {
      try {
        setLoading(true);
        setError(null);

        const [ideasSnap, messagesSnap, licensesSnap] = await Promise.all([
          getCountFromServer(collection(db, "ideas")),
          getCountFromServer(collection(db, "contactMessages")),
          getCountFromServer(collection(db, "licenses")),
        ]);

        const counts: AdminCounts = {
          ideas: ideasSnap.data().count || 0,
          messages: messagesSnap.data().count || 0,
          licenses: licensesSnap.data().count || 0,
        };

        setIdeas(counts.ideas);
        setMessages(counts.messages);
        setLicenses(counts.licenses);
      } catch (err: any) {
        console.error("Feil i useAdminCounts:", err);
        setError(
          err?.message ||
            "Kunne ikke hente tellere for admin. Sjekk konsollen for detaljer."
        );
      } finally {
        setLoading(false);
      }
    };

    loadCounts();
  }, []);

  return {
    ideas,
    messages,
    licenses,
    loading,
    error,
  };
};
