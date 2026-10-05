import { useParams } from "react-router";
import AsyncBoundary from "@/components/ui/AsyncBoundary";
import AsesorHeader from "@/components/asesores/AsesorHeader";
import OfertasDelAsesor from "@/components/asesores/OfertasDelAsesor";
import ResenaList from "@/components/asesores/ResenaList";
import { useAsesorPerfil } from "@/hooks/useAsesorPerfil";
import { useAuth } from "@/hooks/useAuth";
import { useResenas } from "@/hooks/useResenas";

export default function AsesorPerfilPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const perfil = useAsesorPerfil(id);
  const resenas = useResenas({ asesor_id: id, page_size: 20 });
  const asesor = perfil.data;

  return (
    <AsyncBoundary state={perfil}>
      {asesor && (
        <div className="space-y-4 sm:space-y-6">
          <AsesorHeader asesor={asesor} />
          <section className="space-y-2 sm:space-y-3">
            <h2 className="text-lg font-semibold">Materias que ofrece</h2>
            <OfertasDelAsesor materias={asesor.materias} puedeSolicitar={asesor.id !== user.id} />
          </section>
          <section className="space-y-2 sm:space-y-3">
            <h2 className="text-lg font-semibold">Reseñas</h2>
            <ResenaList state={resenas} />
          </section>
        </div>
      )}
    </AsyncBoundary>
  );
}