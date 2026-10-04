import { http } from "./http";

export const asesoriasApi = {
  list: (params) => http.get("/asesorias/", { params }),
  get: (id) => http.get(`/asesorias/${id}/`),
  create: (payload) => http.post("/asesorias/", payload),
  cotizar: (payload) => http.post("/asesorias/cotizar/", payload),
  changeState: (id, estado) => http.patch(`/asesorias/${id}/estado/`, { estado }),
};