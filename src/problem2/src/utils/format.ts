export function formatNumber(value: number | null, fractionDigits = 6) {
  if (value === null || Number.isNaN(value)) return "-";
  return value.toLocaleString(undefined, {
    minimumFractionDigits: Math.min(2, fractionDigits),
    maximumFractionDigits: fractionDigits,
  });
}

export function formatCurrency(value: number | null): string {
  if (value === null || Number.isNaN(value)) return "-";
  return value.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
