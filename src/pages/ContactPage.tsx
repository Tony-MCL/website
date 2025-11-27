import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const ContactPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !message.trim()) {
      setError("E-post og melding må fylles ut.");
      setSuccess(null);
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      await addDoc(collection(db, "messages"), {
        name: name.trim() || null,
        email: email.trim(),
        subject: subject.trim() || null,
        message: message.trim(),
        createdAt: serverTimestamp(),
        source: "website",
      });

      setSuccess("Takk for meldingen! Jeg tar kontakt så snart jeg kan.");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err: any) {
      console.error("Feil ved innsending av melding:", err);
      const msg =
        err?.message ||
        "Noe gikk galt ved innsending av meldingen. Sjekk konsollen for detaljer.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="page form-page">
      <section className="form-header">
        <h1>Kontakt</h1>
        <p>
          Ta gjerne kontakt hvis du har spørsmål om Formelsamlingen, andre
          planlagte verktøy eller ønsker om samarbeid.
        </p>
      </section>

      <section className="form-card">
        <h2>Send en melding</h2>
        <p className="form-info">
          Fyll inn feltene under. Du får svar på e-post så snart som mulig.
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
              E-post <span className="required">*</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="din@epost.no"
                required
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Emne (valgfritt)
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Hva gjelder henvendelsen?"
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Melding <span className="required">*</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={7}
                placeholder="Skriv meldingen din her…"
                required
              />
            </label>
          </div>

          {error && <p className="form-error">{error}</p>}
          {success && <p className="form-success">{success}</p>}

          <div className="form-actions">
            <button type="submit" disabled={submitting}>
              {submitting ? "Sender…" : "Send melding"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default ContactPage;
