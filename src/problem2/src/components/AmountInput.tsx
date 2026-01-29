import styles from "./AmountInput.module.css";

interface AmountInputProps {
  id: string;
  label: string;
  amount: string;
  onAmountChange?: (value: string) => void;
  readOnly?: boolean;
}

export function AmountInput({
  id,
  label,
  amount,
  onAmountChange,
  readOnly = false,
}: AmountInputProps) {
  return (
    <input
      id={id}
      type="number"
      inputMode="decimal"
      placeholder="0.00"
      value={amount}
      onChange={
        onAmountChange ? (e) => onAmountChange(e.target.value) : undefined
      }
      readOnly={readOnly}
      aria-label={label}
      className={styles.input}
    />
  );
}
