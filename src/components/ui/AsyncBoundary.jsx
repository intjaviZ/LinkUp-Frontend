import Button from "./Button";
import { ErrorAlert } from "./Alert";
import Spinner from "./Spinner";

export default function AsyncBoundary({ state, children }) {
  const { data, loading, error, reload } = state;

  if (error) {
    return (
      <div className="space-y-3">
        <ErrorAlert error={error} />
        <Button variant="secondary" onClick={reload}>Reintentar</Button>
      </div>
    );
  }
  if (loading && data == null) {
    return <div className="flex justify-center py-10"><Spinner /></div>;
  }
  return children;
}