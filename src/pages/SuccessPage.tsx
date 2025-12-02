import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

type Status = "idle" | "loading" | "success" | "error";

type DebugInfo = {
  sessionId?: string | null;
  workerCreateUrl?: string | null;
  issueTokenUrl?: string | null;
  responseStatus?: number;
  responseBody?: unknown;
  errorMessage?: string;
};

const LOCALSTORAGE_KEY = "mcl_fm_licToken_v1";
const FORMELSAMLING_APP_URL = "https://tony-mcl.github.io/formler/";

const workerCreateUrl = import.meta.env.VITE_STRIPE_WORKER_URL as
  | string
  | undefined;

function deriveIssueTokenUrl(url: string | undefined): string | null {
  if (!url) return null;

  // Standardoppsett: env peker mot /create-checkout-session → bytt til /issue-lic-token
  if (url.includes("/create-checkout-session")) {
    return url.replace("/create-checkout-session", "/issue-lic-token");
  }

  // Hvis du senere endrer env til å være base-URL, legger vi bare på path
  return `${url.replace(/\/$/, "")}/issue-lic-token`;
}

const SuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();

  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");
  const [debugOpen, setDebugOpen] = useState(false);
  const [debugInfo, setDebugInfo] = useState<DebugInfo>({});

  useEffect(() => {
    const run = async () => {
      const sessionId = searchParams.get("session_id");
      const issueTokenUrl = deriveIssueTokenUrl(workerCreateUrl);

      setDebugInfo({
        sessionId,
        workerCreateUrl: workerCreateUrl ?? null,
        issueTokenUrl,
      });

      if (!sessionId) {
        setStatus("error");
        setMessage(
          "Mangler session_id i adressen. Kunne ikke aktivere lisensen automatisk."
        );
        console.error("[MCL][SuccessPage] Missing session_id in URL", {
          sessionId,
        });
        return;
      }

      if (!issueTokenUrl) {
        setStatus("error");
        setMessage(
          "Stripe Worker URL mangler eller er feil konfigurert. Kontakt support hvis problemet vedvarer."
        );
        console.error(
          "[MCL][SuccessPage] Missing or invalid VITE_STRIPE_WORKER_URL",
          { workerCreateUrl }
        );
        setDebugInfo((prev) => ({
          ...prev,
          errorMessage:
            "VITE_STRIPE_WORKER_URL er ikke satt / utilgjengelig i miljøet.",
        }));
        return;
      }

      setStatus("loading");
      setMessage("Aktiverer lisens …");

      try {
        const url = `${issueTokenUrl}?session_id=${encodeURIComponent(
          sessionId
        )}`;

        console.log("[MCL][SuccessPage] Fetching license token from worker", {
          url,
        });

        const res = await fetch(url, {
          method: "GET",
        });

        let body: any = {};
        try {
          body = await res.json();
        } catch {
          body = {};
        }

        console.log("[MCL][SuccessPage] Worker response", {
          status: res.status,
          body,
        });

        setDebugInfo((prev) => ({
          ...prev,
          responseStatus: res.status,
          responseBody: body,
        }));

        if (!res.ok) {
          const msg =
            body?.error ||
            `Ugyldig respons fra worker (HTTP ${res.status}).`;
          throw new Error(msg);
        }

        const token: string | undefined =
          body.token || body.licToken || body.licenseToken;

        if (!token) {
          throw new Error(
            "Mottok ingen lisens-token i responsen fra worker-endepunktet."
          );
        }

        try {
          window.localStorage.setItem(LOCALSTORAGE_KEY, token);
          console.log(
            "[MCL][SuccessPage] License token stored in localStorage",
            {
              key: LOCALSTORAGE_KEY,
            }
          );
        } catch (storageErr: any) {
          console.error(
            "[MCL][SuccessPage] Failed to write token to localStorage",
            storageErr
          );
          throw new Error(
            "Lisens-token ble mottatt, men kunne ikke lagres lokalt. Sjekk nettleserinnstillinger."
          );
        }

        setStatus("success");
        setMessage("Lisensen for Formelsamlingen er aktivert på denne enheten.");
      } catch (err: any) {
        console.error("[MCL][SuccessPage] Error during license activation", err);
        setStatus("error");
        setMessage(
          err?.message ||
            "Noe gikk galt under aktivering av lisensen. Du kan prøve igjen, eller aktivere via fallback inne i appen."
        );
        setDebugInfo((prev) => ({
          ...prev,
          errorMessage: err?.message ?? "Ukjent feil under lisensaktivering.",
        }));
      }
    };

    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const statusTitle = (() => {
    switch (status) {
      case "loading":
        return "Fullfører lisenskjøpet …";
      case "success":
        return "Takk for kjøpet! ✅";
      case "error":
        return "Noe gikk galt";
      default:
        return "Fullfører lisenskjøpet …";
    }
  })();

  const leadText =
    message ||
    "Vi henter lisensinformasjon fra Stripe og aktiverer Formelsamling for deg.";

  return (
    <main className="page status-page">
      <section className="status-card status-success">
        <h1>{statusTitle}</h1>

        <p className="status-lead">{leadText}</p>

        {status === "loading" && (
          <p>
            Dette tar normalt bare noen sekunder. Du kan trygt la siden stå
            åpen mens vi fullfører.
          </p>
        )}

        {status === "success" && (
          <p>
            Lisens-token er lagret i nettleseren din under samme nøkkel som
            Formelsamling-appen bruker. Når du åpner appen på denne enheten vil
            PRO-modus være aktiv.
          </p>
        )}

        {status === "error" && (
          <>
            <p>
              Hvis dette skjer gjentatte ganger, kan du fortsatt bruke
              fallback-løsningen i appen (trial/e-post), eller ta kontakt for
              hjelp.
            </p>
          </>
        )}

        <div className="status-actions">
          <a href={FORMELSAMLING_APP_URL} className="status-button">
            Åpne Formelsamlingen
          </a>

          <Link to="/produkter/formelsamling" className="status-link">
            Tilbake til produktsiden →
          </Link>

          <Link to="/kontakt" className="status-link">
            Kontakt oss hvis du trenger hjelp →
          </Link>
        </div>

        {/* Enkel debug-seksjon for oss – skjules som default */}
        <details
          style={{ marginTop: "1.1rem", fontSize: "0.85rem" }}
          open={debugOpen}
          onToggle={(e) =>
            setDebugOpen((e.target as HTMLDetailsElement).open)
          }
        >
          <summary>Debug-info (intern bruk)</summary>
          <pre
            style={{
              marginTop: "0.4rem",
              padding: "0.7rem",
              borderRadius: "8px",
              background: "#050505",
              border: "1px solid rgba(255,255,255,0.08)",
              overflowX: "auto",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {JSON.stringify(
              {
                status,
                localStorageKey: LOCALSTORAGE_KEY,
                ...debugInfo,
              },
              null,
              2
            )}
          </pre>
        </details>
      </section>
    </main>
  );
};

export default SuccessPage;
