const CONTROL =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm transition placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-60";

function FieldShell({ label, error, hint, children, id }) {
  return (
    <label htmlFor={id} className="block space-y-1.5">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      {children}
      {hint && !error && <span className="block text-xs text-slate-500">{hint}</span>}
      {error && <span className="block text-xs text-red-600">{error}</span>}
    </label>
  );
}

export function InputField({ label, error, hint, id, ...props }) {
  return (
    <FieldShell label={label} error={error} hint={hint} id={id}>
      <input id={id} className={CONTROL} {...props} />
    </FieldShell>
  );
}

export function SelectField({ label, error, hint, children, id, ...props }) {
  return (
    <FieldShell label={label} error={error} hint={hint} id={id}>
      <select id={id} className={CONTROL} {...props}>
        {children}
      </select>
    </FieldShell>
  );
}

export function TextareaField({ label, error, hint, id, rows = 4, ...props }) {
  return (
    <FieldShell label={label} error={error} hint={hint} id={id}>
      <textarea id={id} rows={rows} className={CONTROL} {...props} />
    </FieldShell>
  );
}