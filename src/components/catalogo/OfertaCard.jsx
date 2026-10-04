import { Link } from "react-router";
import { ButtonLink } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Rating from "@/components/ui/Rating";
import SkillChips from "@/components/shared/SkillChips";
import { formatMoney } from "@/utils/format";

export default function OfertaCard({ oferta }) {
  const { asesor, materia } = oferta;

  return (
    <Card className="flex flex-col gap-3">
      <div>
        <h3 className="font-semibold">{materia.nombre}</h3>
        <p className="text-sm text-slate-500">
          {materia.es_tronco_comun ? "Tronco común" : materia.carrera} · Cuatrimestre {materia.cuatrimestre}
        </p>
      </div>
      <div className="flex items-center justify-between gap-2">
        <Link to={`/asesores/${asesor.id}`} className="font-medium text-indigo-600 hover:underline">
          {asesor.nombre}
        </Link>
        <Rating value={oferta.rating_promedio} total={oferta.total_resenas} />
      </div>
      <SkillChips skills={asesor.skills} />
      <div className="mt-auto flex items-center justify-between">
        <span className="text-lg font-bold">
          {formatMoney(oferta.precio_hora)}<span className="text-xs font-normal text-slate-500">/hora</span>
        </span>
        <ButtonLink to={`/asesorias/nueva/${oferta.id}`}>Solicitar</ButtonLink>
      </div>
    </Card>
  );
}