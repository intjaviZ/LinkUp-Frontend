import { asesoresApi } from "@/api/asesoresApi";
import { useFetch } from "./useFetch";

export const useAsesorPerfil = (id) => useFetch(() => asesoresApi.get(id), [id]);