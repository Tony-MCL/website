import React, { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
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

type DetailType = "idea" | "message";

type DetailState =
  | {
      type: DetailType;
      item: IdeaDoc | MessageDoc;
    }
  | null;

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

  const [detail, setDetail] = useState<DetailState>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

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

        const ideasData: IdeaDoc[] = ideasSnap.docs.map((docSnap) => {
          const data = docSnap.data() as any;
          let createdAt: Date | null = null;
          const ts = data.createdAt;
          if (ts && typeof ts.toDate === "function") {
            createdAt = ts.toDate();
          }
          return {
            id: docSnap.id,
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

        const messagesData: MessageDoc[] = messagesSnap.docs.map((docSnap) => {
          const data = docSnap.data() as any;
          let createdAt: Date | null = null;
          const ts = data.createdAt;
          if (ts && typeof ts.toDate === "function") {
            createdAt = ts.toDate();
          }
          return {
            id: docSnap.id,
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

  const openDetail = (type: DetailType, item: IdeaDoc | MessageDoc) => {
    setDetail({ type, item });
    setActionError(null);
  };

  const closeDetail = () => {
    setDetail(null);
    setActionError(null);
  };

  const handleDelete = async (type: DetailType, id: string) => {
    try {
      setDeletingId(id);
      setActionError(null);

      const col = type === "idea" ? "ideas" : "messages";
      await deleteDoc(doc(db, col, id));

      if (type === "idea") {
        setIdeas((prev) => prev.filter((i) => i.id !== id));
      } else {
        setMessages((prev) => prev.filter((m) => m.id !== id));
      }

      // Lukk detalj-visningen hvis vi slettet den som var åpen
      if (detail && detail.item.id === id) {
        closeDetail();
      }
    } catch (err: any) {
      console.error("Feil ved sletting:", err);
      setActionError(
        err?.message ||
          "Kunne ikke slette elementet. Sjekk konsollen for detaljer."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="page admin-subpage">
      <h1>Meldinger og idéer</h1>
      <p>
        Her ser du innsendte meldinger og idéer fra nettsiden. Nyeste innlegg
        vises øverst. Du kan åpne hver rad for å lese hele innholdet, og
        slette elementer som er behandlet.
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
              <span className="admin-col-actions">Handling</span>
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
                <span className="admin-col-actions">
                  <button
                    type="button"
                    className="admin-link-button"
                    onClick={() => openDetail("idea", idea)}
                  >
                    Les
                  </button>
                  <button
                    type="button"
                    className="admin-link-button admin-delete-button"
                    onClick={() => handleDelete("idea", idea.id)}
                    disabled={deletingId === idea.id}
                  >
                    {deletingId === idea.id ? "Sletter…" : "Slett"}
                  </button>
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
              <span className="admin-col-actions">Handling</span>
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
                <span className="admin-col-actions">
                  <button
                    type="button"
                    className="admin-link-button"
                    onClick={() => openDetail("message", m)}
                  >
                    Les
                  </button>
                  <button
                    type="button"
                    className="admin-link-button admin-delete-button"
                    onClick={() => handleDelete("message", m.id)}
                    disabled={deletingId === m.id}
                  >
                    {deletingId === m.id ? "Sletter…" : "Slett"}
                  </button>
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Detalj-modal */}
      {detail && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal">
            <h2>
              {detail.type === "idea" ? "Detaljer – idé" : "Detaljer – melding"}
            </h2>

            <div className="admin-modal-meta">
              <div>
                <span className="admin-modal-label">Dato</span>
                <div>{formatDateTime(detail.item.createdAt)}</div>
              </div>
              <div>
                <span className="admin-modal-label">Avsender</span>
                <div>
                  {"name" in detail.item && detail.item.name
                    ? detail.item.name
                    : "Ukjent"}
                  {"email" in detail.item && detail.item.email
                    ? ` · ${detail.item.email}`
                    : ""}
                </div>
              </div>
            </div>

            {detail.type === "message" && "subject" in detail.item && (
              <div className="admin-modal-field">
                <span className="admin-modal-label">Emne</span>
                <div>{detail.item.subject || "—"}</div>
              </div>
            )}

            <div className="admin-modal-field">
              <span className="admin-modal-label">
                {detail.type === "idea" ? "Idé" : "Melding"}
              </span>
              <div className="admin-modal-body">
                {"idea" in detail.item
                  ? detail.item.idea
                  : "message" in detail.item
                  ? detail.item.message
                  : ""}
              </div>
            </div>

            {actionError && (
              <p className="admin-error admin-modal-error">{actionError}</p>
            )}

            <div className="admin-modal-actions">
              <button
                type="button"
                className="admin-secondary-button"
                onClick={closeDetail}
              >
                Lukk
              </button>
              <button
                type="button"
                className="admin-danger-button"
                onClick={() =>
                  handleDelete(detail.type, (detail.item as any).id)
                }
                disabled={deletingId === (detail.item as any).id}
              >
                {deletingId === (detail.item as any).id
                  ? "Sletter…"
                  : "Slett"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default MessagesPage;
