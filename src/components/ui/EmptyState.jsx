export default function EmptyState({ children }) {
  return (
    <p className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-500 sm:p-10">
      {children}
    </p>
  );
}