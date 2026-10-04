export const ROL = { ESTUDIANTE: "estudiante", ASESOR: "asesor" };

export const HORAS_MIN = 1;
export const HORAS_MAX = 12;

export const ESTADOS = {
  PENDIENTE: { label: "Pendiente", color: "bg-amber-100 text-amber-800" },
  ACEPTADA: { label: "Aceptada", color: "bg-blue-100 text-blue-800" },
  FINALIZADA: { label: "Finalizada", color: "bg-green-100 text-green-800" },
  CANCELADA: { label: "Cancelada", color: "bg-slate-200 text-slate-700" },
};

// Botón que se pinta por cada transición que el API permite
export const ACCIONES_ESTADO = {
  ACEPTADA: { label: "Aceptar", variant: "primary" },
  FINALIZADA: { label: "Marcar como finalizada", variant: "primary" },
  CANCELADA: { label: "Cancelar", variant: "danger", confirm: "¿Seguro que quieres cancelar esta asesoría?" },
};