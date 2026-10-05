import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { asesoriasApi } from "@/api/asesoriasApi";
import Alert, { ErrorAlert } from "@/components/ui/Alert";
import AsyncBoundary from "@/components/ui/AsyncBoundary";
import Card from "@/components/ui/Card";
import PagoModal from "@/components/asesorias/PagoModal";
import SolicitudForm from "@/components/asesorias/SolicitudForm";
import { useCotizacion } from "@/hooks/useAsesorias";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "@/hooks/useForm";
import { useMutation } from "@/hooks/useMutation";
import { useOferta } from "@/hooks/useOfertas";
import { formatMoney } from "@/utils/format";

const INITIAL = { fecha: "", horas: "1" };

export default function SolicitarAsesoriaPage() {
  const { asesorMateriaId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const oferta = useOferta(asesorMateriaId);
  const { values, handleChange } = useForm(INITIAL);
  const cotizacion = useCotizacion(asesorMateriaId, values.horas);
  const agendar = useMutation(asesoriasApi.create);
  const [pagoAbierto, setPagoAbierto] = useState(false);

  const data = oferta.data;
  const errors = agendar.error?.fieldErrors ?? {};

  let blockedReason = null;
  if (data?.asesor.id === user.id) blockedReason = "No puedes solicitarte una asesoría a ti mismo.";
  else if (data && !data.activo) blockedReason = "Esta oferta ya no está disponible.";

  const handleSubmit = (event) => {
    event.preventDefault();
    agendar.reset();
    setPagoAbierto(true); // pago simulado: primero se muestra el monto total
  };

  const handleConfirm = async () => {
    const { ok, data: asesoria } = await agendar.run({
      asesor_materia: Number(asesorMateriaId),
      fecha: new Date(values.fecha).toISOString(),
      horas: Number(values.horas),
    });
    if (ok) navigate(`/asesorias/${asesoria.id}`);
    else setPagoAbierto(false); // los errores se ven en el formulario
  };

  return (
    <AsyncBoundary state={oferta}>
      {data && (
        <div className="mx-auto max-w-2xl space-y-4 sm:space-y-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Solicitar asesoría</h1>
            <p className="mt-1 text-sm text-slate-500 sm:text-base">Revisa el detalle y confirma el horario para agendarla.</p>
          </div>
          <Card className="space-y-1">
            <p className="font-semibold text-lg">{data.materia.nombre}</p>
            <p className="text-sm text-slate-500">
              Asesor: {data.asesor.nombre} · {formatMoney(data.precio_hora)}/hora
            </p>
          </Card>
          {blockedReason && <Alert variant="error">{blockedReason}</Alert>}
          <ErrorAlert error={agendar.error} />
          <Card>
            <SolicitudForm
              values={values}
              onChange={handleChange}
              errors={errors}
              cotizacion={cotizacion}
              blockedReason={blockedReason}
              onSubmit={handleSubmit}
            />
          </Card>
          <PagoModal
            open={pagoAbierto}
            cotizacion={cotizacion.data}
            loading={agendar.loading}
            onConfirm={handleConfirm}
            onClose={() => setPagoAbierto(false)}
          />
        </div>
      )}
    </AsyncBoundary>
  );
}