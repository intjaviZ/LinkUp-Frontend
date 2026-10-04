import { asesorMateriasApi } from "@/api/asesorMateriasApi";
import { useFetch } from "./useFetch";

export const useOfertas = (params) =>
  useFetch(() => asesorMateriasApi.list(params), [JSON.stringify(params)]);

export const useOferta = (id) => useFetch(() => asesorMateriasApi.get(id), [id]);

export const useMisOfertas = () =>
  useFetch(async () => (await asesorMateriasApi.list({ mias: true, page_size: 100 })).results, []);