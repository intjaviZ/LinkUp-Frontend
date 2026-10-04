export default function Spinner() {
  return (
    <div
      role="status"
      aria-label="Cargando"
      className="h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-indigo-600"
    />
  );
}