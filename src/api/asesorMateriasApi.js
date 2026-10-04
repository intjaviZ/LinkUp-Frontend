import { http } from "./http";

const PATH = "/asesor-materias/";

export const asesorMateriasApi = {
  list: (params) => http.get(PATH, { params }),
  get: (id) => http.get(`${PATH}${id}/`),
  create: (payload) => http.post(PATH, payload),
  update: (id, payload) => http.patch(`${PATH}${id}/`, payload),
  remove: (id) => http.delete(`${PATH}${id}/`),
};