import { formatNumber } from "../utils/format";
import { MetadataItem } from "./MetadataItem";
import styles from "./SwapMetadata.module.css";

interface SwapMetadataProps {
  rate: number | null;
  fromSymbol: string | null;
  toSymbol: string | null;
  loadingPrices: boolean;
  pricesError: string | null;
  lastUpdated: string;
}

export function SwapMetadata({
  rate,
  fromSymbol,
  toSymbol,
  loadingPrices,
  pricesError,
  lastUpdated,
}: SwapMetadataProps) {
  const rateDisplay =
    rate && fromSymbol && toSymbol
      ? `1 ${fromSymbol} ≈ ${formatNumber(rate, 6)} ${toSymbol}`
      : "--";

  const statusDisplay = loadingPrices
    ? "Fetching prices..."
    : pricesError
      ? "Error"
      : "Live";

  return (
    <div className={styles.meta}>
      <MetadataItem label="Rate" value={rateDisplay} />
      <MetadataItem label="Status" value={statusDisplay} />
      <MetadataItem label="Last updated" value={lastUpdated || "-"} />
    </div>
  );
}
