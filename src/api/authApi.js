import { http } from "./http";

export const authApi = {
  login: (email, password) => http.post("/auth/token/", { email, password }, { auth: false }),
  register: (payload) => http.post("/auth/register/", payload, { auth: false }),
  me: () => http.get("/auth/me/"),
  updateMe: (payload) => http.patch("/auth/me/", payload),
};