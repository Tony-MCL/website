import React, { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

type IdeaDoc = {
  id: string;
  name?: string | null;
  email?: string | null;
  idea: string;
  createdAt?: Date | null;
};

type MessageDoc = {
  id: string;
  name?: string | null;
  email: string | null;
  subject?: string | null;
  message: string;
  createdAt?: Date | null;
};

const formatDateTime = (d?: Date | null) => {
  if (!d) return "—";
  try {
    return d.toLocaleString("nb-NO", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return d.toString();
  }
};

const MessagesPage: React.FC = () => {
  const [ideas, setIdeas] = useState<IdeaDoc[]>([]);
  const [messages, setMessages] = useState<MessageDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        // Idéer
        const ideasRef = collection(db, "ideas");
        const ideasSnap = await getDocs(
          query(ideasRef, orderBy("createdAt", "desc"))
        );

        const ideasData: IdeaDoc[] = ideasSnap.docs.map((doc) => {
          const data = doc.data() as any;
          let createdAt: Date | null = null;
          const ts = data.createdAt;
          if (ts && typeof ts.toDate === "function") {
            createdAt = ts.toDate();
          }
          return {
            id: doc.id,
            name: data.name ?? null,
            email: data.email ?? null,
            idea: data.idea ?? "",
            createdAt,
          };
        });

        // Meldinger
        const messagesRef = collection(db, "messages");
        const messagesSnap = await getDocs(
          query(messagesRef, orderBy("createdAt", "desc"))
        );

        const messagesData: MessageDoc[] = messagesSnap.docs.map((doc) => {
          const data = doc.data() as any;
          let createdAt: Date | null = null;
          const ts = data.createdAt;
          if (ts && typeof ts.toDate === "function") {
            createdAt = ts.toDate();
          }
          return {
            id: doc.id,
            name: data.name ?? null,
            email: data.email ?? null,
            subject: data.subject ?? null,
            message: data.message ?? "",
            createdAt,
          };
        });

        setIdeas(ideasData);
        setMessages(messagesData);
      } catch (err: any) {
        console.error("Feil ved henting av ideer/meldinger:", err);
        setError(
          err?.message ||
            "Kunne ikke hente ideer og meldinger. Sjekk konsollen for detaljer."
        );
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <main className="page admin-subpage">
      <h1>Meldinger og idéer</h1>
      <p>
        Her ser du innsendte meldinger og idéer fra nettsiden. Nyeste innlegg
        vises øverst.
      </p>

      {error && <p className="admin-error">{error}</p>}

      {/* Idéer */}
      <section className="admin-sub-section">
        <h2>Innsendte idéer</h2>
        {loading && <p>Laster innhold…</p>}

        {!loading && ideas.length === 0 && (
          <p className="admin-empty">Ingen idéer mottatt ennå.</p>
        )}

        {!loading && ideas.length > 0 && (
          <div className="admin-list">
            <div className="admin-list-header">
              <span>Dato</span>
              <span>Avsender</span>
              <span>Idé</span>
            </div>
            {ideas.map((idea) => (
              <div key={idea.id} className="admin-list-row">
                <span className="admin-col-date">
                  {formatDateTime(idea.createdAt)}
                </span>
                <span className="admin-col-from">
                  {idea.name || "Ukjent"}{" "}
                  {idea.email ? <span>· {idea.email}</span> : null}
                </span>
                <span className="admin-col-text">
                  {idea.idea.length > 140
                    ? idea.idea.slice(0, 140) + "…"
                    : idea.idea}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Meldinger */}
      <section className="admin-sub-section">
        <h2>Kontaktmeldinger</h2>
        {loading && <p>Laster innhold…</p>}

        {!loading && messages.length === 0 && (
          <p className="admin-empty">Ingen meldinger mottatt ennå.</p>
        )}

        {!loading && messages.length > 0 && (
          <div className="admin-list">
            <div className="admin-list-header">
              <span>Dato</span>
              <span>Avsender</span>
              <span>Emne / melding</span>
            </div>
            {messages.map((m) => (
              <div key={m.id} className="admin-list-row">
                <span className="admin-col-date">
                  {formatDateTime(m.createdAt)}
                </span>
                <span className="admin-col-from">
                  {m.name || "Ukjent"}{" "}
                  {m.email ? <span>· {m.email}</span> : null}
                </span>
                <span className="admin-col-text">
                  {m.subject ? (
                    <>
                      <strong>{m.subject}</strong>{" "}
                      <span>– </span>
                    </>
                  ) : null}
                  {m.message.length > 160
                    ? m.message.slice(0, 160) + "…"
                    : m.message}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default MessagesPage;
