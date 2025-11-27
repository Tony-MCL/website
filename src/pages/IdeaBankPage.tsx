import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const IdeaBankPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [idea, setIdea] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!idea.trim()) {
      setError("Beskrivelsen av idéen må fylles ut.");
      setSuccess(null);
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      await addDoc(collection(db, "ideas"), {
        name: name.trim() || null,
        email: email.trim() || null,
        idea: idea.trim(),
        createdAt: serverTimestamp(),
        source: "website",
      });

      setSuccess("Takk for at du delte idéen din! 🎉");
      setName("");
      setEmail("");
      setIdea("");
    } catch (err) {
      console.error(err);
      setError("Noe gikk galt ved lagring av idéen. Prøv igjen senere.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="page form-page">
      <section className="form-header">
        <h1>Idebank</h1>
        <p>
          Har du forslag til nye funksjoner, verktøy eller forbedringer?
          Del det her – både små og store idéer er interessante.
        </p>
      </section>

      <section className="form-card">
        <h2>Send inn idé</h2>
        <p className="form-info">
          Navn og e-post er frivillig, men gjør det lettere å ta kontakt hvis
          vi ønsker å følge opp for mer detaljer.
        </p>

        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-row">
            <label>
              Navn (valgfritt)
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ditt navn"
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              E-post (valgfritt)
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="din@epost.no"
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Idé / forslag <span className="required">*</span>
              <textarea
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="Beskriv idéen din så konkret som mulig…"
                rows={6}
                required
              />
            </label>
          </div>

          {error && <p className="form-error">{error}</p>}
          {success && <p className="form-success">{success}</p>}

          <div className="form-actions">
            <button type="submit" disabled={submitting}>
              {submitting ? "Sender inn…" : "Send idé"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default IdeaBankPage;
