import { ButtonLink } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import { formatMoney } from "@/utils/format";

export default function OfertasDelAsesor({ materias, puedeSolicitar }) {
  if (!materias.length) return <EmptyState>Este asesor no tiene materias activas.</EmptyState>;

  return (
    <div className="space-y-2 sm:space-y-3">
      {materias.map((oferta) => (
        <Card key={oferta.id} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold">{oferta.materia.nombre}</p>
            <p className="text-sm text-slate-500">{formatMoney(oferta.precio_hora)}/hora</p>
          </div>
          {puedeSolicitar && (
            <ButtonLink to={`/asesorias/nueva/${oferta.id}`} className="self-start sm:self-auto">
              Solicitar
            </ButtonLink>
          )}
        </Card>
      ))}
    </div>
  );
}