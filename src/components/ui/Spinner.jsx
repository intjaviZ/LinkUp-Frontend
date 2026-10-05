export default function Spinner({ size = "md" }) {
  const sizeCls = size === "sm" ? "h-4 w-4" : size === "lg" ? "h-8 w-8" : "h-6 w-6";
  return (
    <div
      role="status"
      aria-label="Cargando"
      className={`${sizeCls} animate-spin rounded-full border-2 border-slate-300 border-t-indigo-600`}
    />
  );
}