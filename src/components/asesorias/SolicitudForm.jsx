import AsyncBoundary from "@/components/ui/AsyncBoundary";
import Button from "@/components/ui/Button";
import { InputField } from "@/components/ui/FormFields";
import { HORAS_MAX, HORAS_MIN } from "@/utils/constants";
import { toInputValue } from "@/utils/format";
import DesgloseCostos from "./DesgloseCostos";

export default function SolicitudForm({ values, onChange, errors, cotizacion, blockedReason, onSubmit }) {
  const canSubmit = Boolean(values.fecha && cotizacion.data && !blockedReason);

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <InputField
          label="Fecha y hora"
          type="datetime-local"
          name="fecha"
          min={toInputValue(new Date())}
          value={values.fecha}
          onChange={onChange}
          error={errors.fecha}
          required
        />
        <InputField
          label="Duración (horas)"
          type="number"
          name="horas"
          min={HORAS_MIN}
          max={HORAS_MAX}
          value={values.horas}
          onChange={onChange}
          error={errors.horas}
          required
        />
      </div>
      <AsyncBoundary state={cotizacion}>
        {cotizacion.data && <DesgloseCostos data={cotizacion.data} />}
      </AsyncBoundary>
      <Button type="submit" disabled={!canSubmit} className="w-full">
        Agendar asesoría
      </Button>
    </form>
  );
}