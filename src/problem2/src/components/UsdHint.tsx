import { formatCurrency } from "../utils/format";
import styles from "./UsdHint.module.css";

interface UsdHintProps {
  usdValue: number | null;
  isValid: boolean;
  readOnly?: boolean;
}

export function UsdHint({ usdValue, isValid, readOnly = false }: UsdHintProps) {
  const getMessage = () => {
    if (isValid && usdValue !== null) {
      return `≈ ${formatCurrency(usdValue)}`;
    }
    return readOnly ? "Waiting for amount" : "Enter an amount greater than 0";
  };

  return (
    <div className={styles.hint} aria-live="polite">
      {getMessage()}
    </div>
  );
}
