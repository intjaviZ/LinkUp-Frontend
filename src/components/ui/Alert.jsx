const VARIANTS = {
  error: "border-red-200 bg-red-50 text-red-800",
  success: "border-green-200 bg-green-50 text-green-800",
  info: "border-blue-200 bg-blue-50 text-blue-800",
};

export default function Alert({ variant = "info", children }) {
  return (
    <div
      role="alert"
      className={`rounded-lg border px-3 py-2 text-sm shadow-sm sm:px-4 sm:py-3 ${VARIANTS[variant]}`}
    >
      {children}
    </div>
  );
}

export function ErrorAlert({ error }) {
  if (!error) return null;
  const extra = error.fieldErrors?.non_field_errors;
  return (
    <Alert variant="error">
      {error.message}
      {extra && ` ${extra}`}
    </Alert>
  );
}