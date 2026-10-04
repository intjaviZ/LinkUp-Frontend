import { useMemo } from "react";
import AsyncBoundary from "@/components/ui/AsyncBoundary";
import EmptyState from "@/components/ui/EmptyState";
import Pagination from "@/components/ui/Pagination";
import CatalogFilters from "@/components/catalogo/CatalogFilters";
import OfertaCard from "@/components/catalogo/OfertaCard";
import { useOfertas } from "@/hooks/useOfertas";
import { useQueryParams } from "@/hooks/useQueryParams";

const DEFAULTS = { page: "1" };
const PAGE_SIZE = 9;

export default function CatalogoPage() {
  const [params, updateParams] = useQueryParams(DEFAULTS);
  const page = Number(params.page) || 1;
  const query = useMemo(() => ({ ...params, excluir_propias: true, page_size: PAGE_SIZE }), [params]);
  const ofertas = useOfertas(query);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Catálogo de asesores</h1>
      <CatalogFilters params={params} onApply={(filters) => updateParams({ ...filters, page: 1 })} />

      <AsyncBoundary state={ofertas}>
        {ofertas.data?.results.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ofertas.data.results.map((oferta) => <OfertaCard key={oferta.id} oferta={oferta} />)}
          </div>
        ) : (
          <EmptyState>No hay asesores que coincidan con esos filtros.</EmptyState>
        )}
        <Pagination page={page} count={ofertas.data?.count ?? 0} pageSize={PAGE_SIZE} onChange={(next) => updateParams({ page: next })} />
      </AsyncBoundary>
    </div>
  );
}