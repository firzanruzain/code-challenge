import { useState } from "react";
import styles from "./TokenIcon.module.css";

const ICON_BASE =
  "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens";

export function TokenIcon({
  symbol,
  size = 32,
}: {
  symbol: string;
  size?: number;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={styles.tokenFallback}
        style={{ width: size, height: size, fontSize: Math.max(12, size / 3) }}
        aria-label={`${symbol} icon placeholder`}
      >
        {symbol.slice(0, 3)}
      </div>
    );
  }

  return (
    <img
      className={styles.tokenIcon}
      src={`${ICON_BASE}/${symbol}.svg`}
      alt={`${symbol} icon`}
      width={size}
      height={size}
      onError={() => setFailed(true)}
      loading="lazy"
    />
  );
}
