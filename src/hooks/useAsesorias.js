import { asesoriasApi } from "@/api/asesoriasApi";
import { HORAS_MAX, HORAS_MIN } from "@/utils/constants";
import { useDebounce } from "./useDebounce";
import { useFetch } from "./useFetch";

export const useAsesorias = (params) =>
  useFetch(() => asesoriasApi.list(params), [JSON.stringify(params)]);

export const useAsesoria = (id) => useFetch(() => asesoriasApi.get(id), [id]);

/** Pide al backend el desglose de costos mientras el usuario cambia las horas. */
export function useCotizacion(asesorMateriaId, horas) {
  const horasEstables = useDebounce(Number(horas), 400);
  const valido =
    Number.isInteger(horasEstables) && horasEstables >= HORAS_MIN && horasEstables <= HORAS_MAX;

  return useFetch(
    () =>
      valido
        ? asesoriasApi.cotizar({ asesor_materia: Number(asesorMateriaId), horas: horasEstables })
        : Promise.resolve(null),
    [asesorMateriaId, horasEstables]
  );
}