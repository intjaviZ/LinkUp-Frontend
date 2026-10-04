import { http } from "./http";

export const resenasApi = {
  list: (params) => http.get("/resenas/", { params }),
  create: (payload) => http.post("/resenas/", payload),
};