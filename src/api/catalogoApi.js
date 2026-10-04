import { http } from "./http";

export const catalogoApi = {
  carreras: () => http.get("/carreras/", { auth: false }),
  materias: (params) => http.get("/materias/", { params }),
};