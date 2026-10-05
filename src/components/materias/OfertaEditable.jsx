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
      <div className="space-y-1">
        <p className="font-semibold">{oferta.materia.nombre}</p>
        <Badge className={oferta.activo ? "bg-green-100 text-green-800" : "bg-slate-200 text-slate-700"}>
          {oferta.activo ? "Activa" : "Inactiva"}
        </Badge>
      </div>
      <div className="flex flex-wrap items-end gap-3">
        <div className="min-w-[200px] flex-1">
          <InputField
            label="Precio por hora"
            type="number"
            min={1}
            step="0.01"
            value={precio}
            onChange={(event) => setPrecio(event.target.value)}
          />
        </div>
        <Button variant="secondary" loading={loading} onClick={() => save({ precio_hora: precio })} className="w-full sm:w-[160px]">
          Guardar precio
        </Button>
        <Button
          variant={oferta.activo ? "danger" : "primary"}
          loading={loading}
          onClick={() => save({ activo: !oferta.activo })}
          className="w-full sm:w-[160px]"
        >
          {oferta.activo ? "Desactivar" : "Reactivar"}
        </Button>
      </div>
      <ErrorAlert error={error} />
    </Card>
  );
}