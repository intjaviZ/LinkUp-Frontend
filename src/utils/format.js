const pad = (n) => String(n).padStart(2, "0");

export const formatMoney = (value) => `$${Number(value ?? 0).toFixed(2)}`;

export const formatDateTime = (iso) =>
  new Date(iso).toLocaleString("es", { dateStyle: "medium", timeStyle: "short" });

/** Valor para <input type="datetime-local"> en hora local */
export const toInputValue = (date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;