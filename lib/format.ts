// Deterministic number formatting. toLocaleString/Intl output can differ between
// Node's ICU build and the browser, which causes hydration mismatches.

/** 12345.5 -> "12,345.50" (decimals fixed), 2400 -> "2,400". */
export function formatNumber(n: number, decimals = 0) {
  const [int, frac] = n.toFixed(decimals).split(".");
  const withCommas = int.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return frac ? `${withCommas}.${frac}` : withCommas;
}

/** Ringgit: whole amounts without decimals, otherwise 2 decimals. */
export function rm(n: number) {
  return `RM${formatNumber(n, Number.isInteger(n) ? 0 : 2)}`;
}
