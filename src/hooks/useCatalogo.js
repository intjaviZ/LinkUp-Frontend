import { catalogoApi } from "@/api/catalogoApi";
import { useFetch } from "./useFetch";

export const useCarreras = () => useFetch(() => catalogoApi.carreras(), []);

export const useMaterias = (params = {}) =>
  useFetch(
    async () => (await catalogoApi.materias({ page_size: 100, ...params })).results,
    [JSON.stringify(params)]
  );