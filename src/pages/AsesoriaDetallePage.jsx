import { Link, useParams } from "react-router";
import AsyncBoundary from "@/components/ui/AsyncBoundary";
import AsesoriaAcciones from "@/components/asesorias/AsesoriaAcciones";
import AsesoriaInfo from "@/components/asesorias/AsesoriaInfo";
import ReseniaForm from "@/components/asesorias/ReseniaForm";
import ResenaItem from "@/components/shared/ResenaItem";
import { useAsesoria } from "@/hooks/useAsesorias";

export default function AsesoriaDetallePage() {
  const { id } = useParams();
  const state = useAsesoria(id);
  const asesoria = state.data;

  return (
    <div className="mx-auto max-w-2xl space-y-3 sm:space-y-4">
      <Link to="/asesorias" className="text-sm text-indigo-600 underline-offset-2 hover:underline">← Volver a mis asesorías</Link>
      <AsyncBoundary state={state}>
        {asesoria && (
          <div className="space-y-3 sm:space-y-4">
            <AsesoriaInfo asesoria={asesoria} />
            <AsesoriaAcciones asesoria={asesoria} onChanged={state.reload} />
            {asesoria.resenia && (
              <section className="space-y-2 sm:space-y-3">
                <h2 className="font-semibold">Reseña</h2>
                <ResenaItem resena={asesoria.resenia} />
              </section>
            )}
            {asesoria.puede_resenar && <ReseniaForm asesoriaId={asesoria.id} onCreated={state.reload} />}
          </div>
        )}
      </AsyncBoundary>
    </div>
  );
}