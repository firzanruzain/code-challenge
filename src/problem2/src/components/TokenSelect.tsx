import { useMemo, useState, type FocusEvent, type KeyboardEvent } from "react";
import { formatNumber } from "../utils/format";
import type { Token } from "../types";
import { TokenIcon } from "./TokenIcon";
import styles from "./TokenSelect.module.css";

type TokenSelectProps = {
  label: string;
  tokens: Token[];
  selected: string | null;
  onSelect: (symbol: string) => void;
  disabledSymbol?: string | null;
};

export function TokenSelect({
  label,
  tokens,
  selected,
  onSelect,
  disabledSymbol,
}: TokenSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const selectedToken = useMemo(
    () => tokens.find((t) => t.symbol === selected) ?? null,
    [tokens, selected],
  );

  const filtered = useMemo(() => {
    // First, deduplicate tokens by symbol to prevent duplicates
    const uniqueTokens = tokens.filter(
      (t, index, arr) =>
        arr.findIndex((t2) => t2.symbol === t.symbol) === index,
    );

    if (!query.trim()) return uniqueTokens;
    return uniqueTokens.filter((t) =>
      t.symbol.toLowerCase().includes(query.trim().toLowerCase()),
    );
  }, [tokens, query]);

  const closeMenu = () => {
    setOpen(false);
    setQuery("");
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      closeMenu();
    }
  };

  const handleKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") closeMenu();
  };

  return (
    <div
      className={styles.select}
      tabIndex={-1}
      onBlur={handleBlur}
      onKeyDown={handleKey}
    >
      <div className={styles.selectLabel}>{label}</div>
      <button
        type="button"
        className={styles.selectTrigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <div className={styles.selectTriggerLeft}>
          {selected ? (
            <TokenIcon symbol={selected} size={30} />
          ) : (
            <div
              className={styles.tokenFallback}
              style={{ width: 30, height: 30 }}
            />
          )}
          <div className={styles.selectTriggerText}>
            <span className={styles.selectSymbol}>
              {selected ?? "Choose token"}
            </span>
            <span className={styles.selectSub}>
              {selectedToken ? `$${formatNumber(selectedToken.price, 4)}` : ""}
            </span>
          </div>
        </div>
        <span className={styles.chevron}>▾</span>
      </button>

      {open && (
        <div className={styles.selectPopover}>
          <input
            className={styles.selectSearch}
            placeholder="Search token"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <div className={styles.selectList} role="listbox">
            {filtered.map((token) => {
              const isDisabled = disabledSymbol === token.symbol;
              return (
                <button
                  key={token.symbol}
                  className={`${styles.selectOption}${
                    token.symbol === selected ? " " + styles.isActive : ""
                  }${isDisabled ? " " + styles.isDisabled : ""}`}
                  type="button"
                  role="option"
                  disabled={isDisabled}
                  aria-selected={token.symbol === selected}
                  onClick={() => {
                    onSelect(token.symbol);
                    closeMenu();
                  }}
                >
                  <div className={styles.selectOptionMain} title={token.symbol}>
                    <TokenIcon symbol={token.symbol} size={26} />
                    <span className={styles.selectOptionSymbol}>
                      {token.symbol}
                    </span>
                  </div>
                  <span className={styles.selectOptionPrice}>
                    ${formatNumber(token.price, 4)}
                  </span>
                </button>
              );
            })}
            {!filtered.length && (
              <div className={styles.selectEmpty}>No matches</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
