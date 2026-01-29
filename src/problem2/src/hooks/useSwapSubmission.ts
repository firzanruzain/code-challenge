import { useState, useCallback } from "react";
import { formatNumber } from "../utils/format";

interface UseSwapSubmissionParams {
  amountFromNumber: number;
  fromSymbol: string | null;
  toSymbol: string | null;
  rate: number | null;
}

interface SubmitMessage {
  type: "success" | "error";
  text: string;
}

export function useSwapSubmission({
  amountFromNumber,
  fromSymbol,
  toSymbol,
  rate,
}: UseSwapSubmissionParams) {
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<SubmitMessage | null>(
    null,
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      setSubmitMessage(null);

      setSubmitting(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1100));
      setSubmitting(false);

      setSubmitMessage({
        type: "success",
        text: `Swapped ${formatNumber(amountFromNumber, 4)} ${fromSymbol} for ≈${formatNumber(
          amountFromNumber * (rate ?? 0),
          4,
        )} ${toSymbol}.`,
      });
    },
    [amountFromNumber, fromSymbol, toSymbol, rate],
  );

  return {
    submitting,
    submitMessage,
    handleSubmit,
  };
}
