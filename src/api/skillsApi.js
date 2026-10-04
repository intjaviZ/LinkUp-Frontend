import { http } from "./http";

export const skillsApi = {
  list: () => http.get("/skills/"),
  create: (skill) => http.post("/skills/", { skill }),
  remove: (id) => http.delete(`/skills/${id}/`),
};