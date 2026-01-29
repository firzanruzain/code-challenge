import { TokenSelect } from "./TokenSelect";
import { AmountInput } from "./AmountInput";
import { UsdHint } from "./UsdHint";
import { type Token } from "../types";
import styles from "./SwapPanel.module.css";

interface SwapPanelProps {
  title: string;
  description: string;
  label: string;
  inputId: string;
  amount: string;
  onAmountChange?: (value: string) => void;
  tokens: Token[];
  selectedSymbol: string | null;
  onSelectSymbol: (symbol: string) => void;
  disabledSymbol: string | null;
  usdValue: number | null;
  isValid: boolean;
  readOnly?: boolean;
  action?: React.ReactNode;
}

export function SwapPanel({
  title,
  description,
  label,
  inputId,
  amount,
  onAmountChange,
  tokens,
  selectedSymbol,
  onSelectSymbol,
  disabledSymbol,
  usdValue,
  isValid,
  readOnly = false,
  action,
}: SwapPanelProps) {
  return (
    <section className={styles.panel}>
      <div className={styles.panelTop}>
        <div>
          <p className={styles.label}>{title}</p>
          <p className={styles.mini}>{description}</p>
        </div>
        {action}
      </div>

      <div className={styles.field}>
        <label htmlFor={inputId}>{label}</label>
        <div className={styles.fieldRow}>
          <AmountInput
            id={inputId}
            label={label}
            amount={amount}
            onAmountChange={onAmountChange}
            readOnly={readOnly}
          />
          <TokenSelect
            label={readOnly ? "To" : "From"}
            tokens={tokens}
            selected={selectedSymbol}
            onSelect={onSelectSymbol}
            disabledSymbol={disabledSymbol}
          />
        </div>
        <UsdHint usdValue={usdValue} isValid={isValid} readOnly={readOnly} />
      </div>
    </section>
  );
}
