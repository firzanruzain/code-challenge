import { type Token } from "../types";

/**
 * Transforms price data into a sorted, validated token array
 */
export function processTokens(
  data: Array<{ currency: string; price: number }>,
): Token[] {
  return data
    .filter((r) => Number.isFinite(r.price) && r.price > 0)
    .map((r) => ({ symbol: r.currency, price: Number(r.price) }))
    .sort((a, b) => a.symbol.localeCompare(b.symbol));
}

/**
 * Creates a lookup map for quick token access by symbol
 */
export function createTokenMap(tokens: Token[]): Record<string, Token> {
  return tokens.reduce<Record<string, Token>>((acc, token) => {
    acc[token.symbol] = token;
    return acc;
  }, {});
}

/**
 * Calculates the exchange rate between two tokens
 */
export function calculateRate(
  fromToken: Token | undefined,
  toToken: Token | undefined,
): number | null {
  if (!fromToken || !toToken) return null;
  return fromToken.price / toToken.price;
}

/**
 * Converts amount to USD value using token price
 */
export function toUsdValue(
  amount: number,
  token: Token | undefined,
): number | null {
  if (!token || Number.isNaN(amount)) return null;
  return amount * token.price;
}
