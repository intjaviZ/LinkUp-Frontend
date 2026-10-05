import AsyncBoundary from "@/components/ui/AsyncBoundary";
import EmptyState from "@/components/ui/EmptyState";
import { SelectField } from "@/components/ui/FormFields";
import Pagination from "@/components/ui/Pagination";
import Tabs from "@/components/ui/Tabs";
import AsesoriaCard from "@/components/asesorias/AsesoriaCard";
import { useAsesorias } from "@/hooks/useAsesorias";
import { useQueryParams } from "@/hooks/useQueryParams";
import { ESTADOS, ROL } from "@/utils/constants";

const DEFAULTS = { rol: ROL.ESTUDIANTE, estado: "", page: "1" };
const PAGE_SIZE = 10;
const TABS = [
  { value: ROL.ESTUDIANTE, label: "Como estudiante" },
  { value: ROL.ASESOR, label: "Como asesor" },
];

export default function MisAsesoriasPage() {
  const [params, updateParams] = useQueryParams(DEFAULTS);
  const page = Number(params.page) || 1;
  const asesorias = useAsesorias({ rol: params.rol, estado: params.estado, page, page_size: PAGE_SIZE });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Mis asesorías</h1>
      <Tabs options={TABS} value={params.rol} onChange={(rol) => updateParams({ rol, page: 1 })} />
      <div className="max-w-xs">
        <SelectField label="Estado" value={params.estado} onChange={(e) => updateParams({ estado: e.target.value, page: 1 })}>
          <option value="">Todos</option>
          {Object.entries(ESTADOS).map(([value, { label }]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </SelectField>
      </div>

      <AsyncBoundary state={asesorias}>
        {asesorias.data?.results.length ? (
      <div className="space-y-2 sm:space-y-3">
        {asesorias.data.results.map((asesoria) => <AsesoriaCard key={asesoria.id} asesoria={asesoria} />)}
      </div>
        ) : (
          <EmptyState>No hay asesorías con estos filtros.</EmptyState>
        )}
        <Pagination page={page} count={asesorias.data?.count ?? 0} pageSize={PAGE_SIZE} onChange={(next) => updateParams({ page: next })} />
      </AsyncBoundary>
    </div>
  );
}