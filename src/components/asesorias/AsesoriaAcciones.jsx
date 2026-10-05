import { useState } from "react";
import { asesoriasApi } from "@/api/asesoriasApi";
import { ErrorAlert } from "@/components/ui/Alert";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useMutation } from "@/hooks/useMutation";
import { ACCIONES_ESTADO } from "@/utils/constants";

export default function AsesoriaAcciones({ asesoria, onChanged }) {
  const { run, loading, error } = useMutation(asesoriasApi.changeState);
  const [pendiente, setPendiente] = useState(null);

  if (!asesoria.transiciones_permitidas.length) return null;

  const handleClick = async (estado) => {
    const accion = ACCIONES_ESTADO[estado];
    if (accion.confirm && !window.confirm(accion.confirm)) return;
    setPendiente(estado);
    const { ok } = await run(asesoria.id, estado);
    if (ok) onChanged();
  };

  return (
    <Card className="space-y-3">
      <h2 className="font-semibold">Acciones</h2>
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        {asesoria.transiciones_permitidas.map((estado) => (
          <Button
            key={estado}
            variant={ACCIONES_ESTADO[estado].variant}
            loading={loading && pendiente === estado}
            disabled={loading}
            onClick={() => handleClick(estado)}
            className="w-full sm:w-auto"
          >
            {ACCIONES_ESTADO[estado].label}
          </Button>
        ))}
      </div>
      <ErrorAlert error={error} />
    </Card>
  );
}