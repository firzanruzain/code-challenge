import styles from "./MetadataItem.module.css";

interface MetadataItemProps {
  label: string;
  value: string;
}

export function MetadataItem({ label, value }: MetadataItemProps) {
  return (
    <div>
      <p className={styles.metaLabel}>{label}</p>
      <p className={styles.metaValue}>{value}</p>
    </div>
  );
}
