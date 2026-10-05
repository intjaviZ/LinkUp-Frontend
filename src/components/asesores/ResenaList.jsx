import AsyncBoundary from "@/components/ui/AsyncBoundary";
import EmptyState from "@/components/ui/EmptyState";
import ResenaItem from "@/components/shared/ResenaItem";

export default function ResenaList({ state }) {
  return (
    <AsyncBoundary state={state}>
      {state.data?.length ? (
        <div className="space-y-2 sm:space-y-3">
          {state.data.map((resena) => <ResenaItem key={resena.id} resena={resena} />)}
        </div>
      ) : (
        <EmptyState>Aún no hay reseñas.</EmptyState>
      )}
    </AsyncBoundary>
  );
}