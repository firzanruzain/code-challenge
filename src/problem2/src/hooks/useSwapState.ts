import { useState, useCallback, useEffect } from "react";
import { type Token } from "../types";

interface UseSwapStateParams {
  tokens: Token[];
}

export function useSwapState({ tokens }: UseSwapStateParams) {
  const [fromSymbol, setFromSymbol] = useState<string | null>(null);
  const [toSymbol, setToSymbol] = useState<string | null>(null);
  const [amountFrom, setAmountFrom] = useState<string>("100");

  // Initialize default token selections
  useEffect(() => {
    if (tokens.length > 0) {
      if (!fromSymbol) {
        setFromSymbol(tokens[0].symbol);
      }
      if (!toSymbol && tokens.length > 1) {
        setToSymbol(tokens[1].symbol);
      }
    }
  }, [tokens, fromSymbol, toSymbol]);

  const handleSwap = useCallback(() => {
    if (!fromSymbol || !toSymbol) return;
    setFromSymbol(toSymbol);
    setToSymbol(fromSymbol);
  }, [fromSymbol, toSymbol]);

  return {
    fromSymbol,
    toSymbol,
    amountFrom,
    setFromSymbol,
    setToSymbol,
    setAmountFrom,
    handleSwap,
  };
}
