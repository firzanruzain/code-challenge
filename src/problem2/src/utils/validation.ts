/**
 * Validates swap form inputs and returns validation state
 */
export function validateSwapForm(params: {
  amountFrom: string;
  amountFromNumber: number;
  fromSymbol: string | null;
  toSymbol: string | null;
  rate: number | null;
  loadingPrices: boolean;
  pricesError: string | null;
  submitting: boolean;
}): {
  isAmountValid: boolean;
  samePair: boolean;
  disableSubmit: boolean;
} {
  const {
    amountFrom,
    amountFromNumber,
    fromSymbol,
    toSymbol,
    rate,
    loadingPrices,
    pricesError,
    submitting,
  } = params;

  const isAmountValid = amountFrom.trim() !== "" && amountFromNumber > 0;
  const samePair = Boolean(fromSymbol && toSymbol && fromSymbol === toSymbol);

  const disableSubmit =
    submitting ||
    loadingPrices ||
    !!pricesError ||
    !isAmountValid ||
    samePair ||
    !fromSymbol ||
    !toSymbol ||
    !rate;

  return {
    isAmountValid,
    samePair,
    disableSubmit,
  };
}
