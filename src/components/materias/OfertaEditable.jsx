import { useState } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { ErrorAlert } from "@/components/ui/Alert";
import { InputField } from "@/components/ui/FormFields";
import { asesorMateriasApi } from "@/api/asesorMateriasApi";
import { useMutation } from "@/hooks/useMutation";

export default function OfertaEditable({ oferta, onChanged }) {
  const [precio, setPrecio] = useState(String(oferta.precio_hora));
  const { run, loading, error } = useMutation(asesorMateriasApi.update);

  const save = async (payload) => {
    const { ok } = await run(oferta.id, payload);
    if (ok) onChanged();
  };

  return (
    <Card className="space-y-3">
      <div className="flex flex-wrap items-end gap-4">
        <div className="min-w-48 flex-1 space-y-1">
          <p className="font-semibold">{oferta.materia.nombre}</p>
          <Badge className={oferta.activo ? "bg-green-100 text-green-800" : "bg-slate-200 text-slate-700"}>
            {oferta.activo ? "Activa" : "Inactiva"}
          </Badge>
        </div>
        <InputField
          label="Precio por hora" type="number" min={1} step="0.01"
          value={precio} onChange={(event) => setPrecio(event.target.value)}
        />
        <Button variant="secondary" loading={loading} onClick={() => save({ precio_hora: precio })}>
          Guardar precio
        </Button>
        <Button variant={oferta.activo ? "danger" : "primary"} loading={loading} onClick={() => save({ activo: !oferta.activo })}>
          {oferta.activo ? "Desactivar" : "Reactivar"}
        </Button>
      </div>
      <ErrorAlert error={error} />
    </Card>
  );
}