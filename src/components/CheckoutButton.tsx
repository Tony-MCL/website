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
    if (!workerUrl) {
      setError("Betaling er ikke aktivert (mangler Stripe Worker URL).");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const basePath = import.meta.env.BASE_URL || "/";
      const origin = window.location.origin;

      const successUrl = `${origin}${basePath}#/success`;
      const cancelUrl = `${origin}${basePath}#/cancel`;

      const response = await fetch(workerUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product,
          billingPeriod,
          autoRenew,
          successUrl,
          cancelUrl,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Feil fra betalingsserver (${response.status}): ${response.statusText}`
        );
      }

      const data = await response.json();

      if (!data?.url) {
        throw new Error("Mottok ingen betalingslenke fra serveren.");
      }

      window.location.href = data.url as string;
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
        {loading ? "Sender deg videre til Stripe…" : buttonLabel}
      </button>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default CheckoutButton;
