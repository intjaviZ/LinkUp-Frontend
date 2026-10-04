import { http } from "./http";

export const asesoresApi = {
  get: (id) => http.get(`/asesores/${id}/`),
};