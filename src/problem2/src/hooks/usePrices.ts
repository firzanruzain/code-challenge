import { useState, useEffect } from "react";
import { type PriceRow, type Token } from "../types";
import { processTokens } from "../utils/tokenUtils";

const PRICE_URL = "https://interview.switcheo.com/prices.json";

export function usePrices() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loadingPrices, setLoadingPrices] = useState(false);
  const [pricesError, setPricesError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const loadPrices = async () => {
    setLoadingPrices(true);
    setPricesError(null);
    try {
      const res = await fetch(PRICE_URL);
      if (!res.ok) throw new Error("Failed to fetch prices");
      const rows: PriceRow[] = await res.json();
      const processedTokens = processTokens(rows);

      setTokens(processedTokens);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error(error);
      setPricesError("Could not load token prices. Please retry.");
    } finally {
      setLoadingPrices(false);
    }
  };

  useEffect(() => {
    loadPrices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    tokens,
    loadingPrices,
    pricesError,
    lastUpdated,
    loadPrices,
  };
}
