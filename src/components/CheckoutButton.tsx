import React, { useState } from "react";

const workerUrl = import.meta.env.VITE_STRIPE_WORKER_URL as
  | string
  | undefined;

type BillingPeriod = "month" | "year";

type CheckoutButtonProps = {
  product: string; // f.eks. "formelsamling", "progress"
  billingPeriod: BillingPeriod;
  autoRenew: boolean;
  label?: string;
};

const CheckoutButton: React.FC<CheckoutButtonProps> = ({
  product,
  billingPeriod,
  autoRenew,
  label,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setError(null);

    if (!workerUrl) {
      setError("Stripe Worker URL mangler (VITE_STRIPE_WORKER_URL).");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(workerUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Matcher det workeren forventer: product + billingPeriod + autoRenew
        body: JSON.stringify({
          product,
          billingPeriod,
          autoRenew,
        }),
      });

      if (!response.ok) {
        const text = await response.text().catch(() => "");
        console.error("Worker error:", text);
        throw new Error(
          `Kunne ikke opprette Checkout-session (HTTP ${response.status}).`
        );
      }

      const data = (await response.json()) as { url?: string };

      if (!data.url) {
        throw new Error("Mottok ingen betalingslenke fra serveren.");
      }

      window.location.href = data.url;
    } catch (err: any) {
      console.error(err);
      setError(
        err?.message ||
          "Noe gikk galt ved opprettelse av betaling. Prøv igjen senere."
      );
    } finally {
      setLoading(false);
    }
  };

  const buttonLabel =
    label ??
    (billingPeriod === "month"
      ? "Kjøp månedslisens"
      : "Kjøp årslisens");

  return (
    <div className="checkout-wrapper">
      <button
        className="checkout-button"
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? "Sender deg til betaling..." : buttonLabel}
      </button>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default CheckoutButton;
