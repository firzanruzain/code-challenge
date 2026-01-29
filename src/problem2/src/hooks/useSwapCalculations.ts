import { useMemo } from "react";
import { type Token } from "../types";

interface SwapCalculationsParams {
  tokens: Token[];
  fromSymbol: string | null;
  toSymbol: string | null;
  amountFrom: string;
}

export function useSwapCalculations({
  tokens,
  fromSymbol,
  toSymbol,
  amountFrom,
}: SwapCalculationsParams) {
  const tokenMap = useMemo(() => {
    return tokens.reduce<Record<string, Token>>((acc, token) => {
      acc[token.symbol] = token;
      return acc;
    }, {});
  }, [tokens]);

  const rate = useMemo(() => {
    if (!fromSymbol || !toSymbol) return null;
    const from = tokenMap[fromSymbol];
    const to = tokenMap[toSymbol];
    if (!from || !to) return null;
    return from.price / to.price;
  }, [fromSymbol, toSymbol, tokenMap]);

  const amountFromNumber = useMemo(() => {
    const value = parseFloat(amountFrom);
    return Number.isFinite(value) ? value : NaN;
  }, [amountFrom]);

  const amountTo = useMemo(() => {
    if (rate === null || Number.isNaN(amountFromNumber)) return "";
    return (amountFromNumber * rate).toFixed(6);
  }, [rate, amountFromNumber]);

  const usdFrom = useMemo(() => {
    if (!fromSymbol || Number.isNaN(amountFromNumber)) return null;
    const token = tokenMap[fromSymbol];
    if (!token) return null;
    return amountFromNumber * token.price;
  }, [fromSymbol, amountFromNumber, tokenMap]);

  const usdTo = useMemo(() => {
    if (!toSymbol || !rate || Number.isNaN(amountFromNumber)) return null;
    const token = tokenMap[toSymbol];
    if (!token) return null;
    return amountFromNumber * rate * token.price;
  }, [toSymbol, amountFromNumber, rate, tokenMap]);

  return {
    rate,
    amountFromNumber,
    amountTo,
    usdFrom,
    usdTo,
  };
}
