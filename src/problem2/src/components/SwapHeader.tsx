import styles from "./SwapHeader.module.css";

interface SwapHeaderProps {
  tokenCount: number;
  loadingPrices: boolean;
  onRefresh: () => void;
}

export function SwapHeader({
  tokenCount,
  loadingPrices,
  onRefresh,
}: SwapHeaderProps) {
  return (
    <header className={styles.header}>
      <div>
        <p className={styles.eyebrow}>Currency Swap</p>
        <h1>Swap assets with live rates</h1>
        <p className={styles.lede}>
          Pick two tokens, type an amount, and confirm. Same-currency swaps are
          prevented automatically.
        </p>
      </div>
      <div className={styles.headerActions}>
        <button
          type="button"
          className={styles.ghost}
          onClick={onRefresh}
          disabled={loadingPrices}
          aria-label="Refresh token prices"
        >
          {loadingPrices ? "Refreshing..." : "Refresh prices"}
        </button>
        <div
          className={styles.badge}
          aria-label={`${tokenCount} tokens available`}
        >
          {tokenCount} tokens
        </div>
      </div>
    </header>
  );
}
