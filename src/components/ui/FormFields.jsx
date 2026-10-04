const CONTROL =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500";

function FieldShell({ label, error, hint, children }) {
  return (
    <label className="block space-y-1">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      {children}
      {hint && !error && <span className="block text-xs text-slate-500">{hint}</span>}
      {error && <span className="block text-xs text-red-600">{error}</span>}
    </label>
  );
}

export function InputField({ label, error, hint, ...props }) {
  return (
    <FieldShell label={label} error={error} hint={hint}>
      <input className={CONTROL} {...props} />
    </FieldShell>
  );
}

export function SelectField({ label, error, hint, children, ...props }) {
  return (
    <FieldShell label={label} error={error} hint={hint}>
      <select className={CONTROL} {...props}>{children}</select>
    </FieldShell>
  );
}

export function TextareaField({ label, error, hint, ...props }) {
  return (
    <FieldShell label={label} error={error} hint={hint}>
      <textarea rows={3} className={CONTROL} {...props} />
    </FieldShell>
  );
}