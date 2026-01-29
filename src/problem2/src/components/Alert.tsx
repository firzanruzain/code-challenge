import styles from "./Alert.module.css";

interface AlertProps {
  children: React.ReactNode;
}

export function Alert({ children }: AlertProps) {
  return (
    <div className={styles.alert} role="alert" aria-live="polite">
      {children}
    </div>
  );
}
