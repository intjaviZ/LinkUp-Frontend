import { createBrowserRouter, Navigate } from "react-router";

import AuthLayout from "@/layouts/AuthLayout";
import AppLayout from "@/layouts/AppLayout";
import ProtectedRoute from "@/routes/ProtectedRoute";
import GuestRoute from "@/routes/GuestRoute";

import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import CatalogoPage from "@/pages/CatalogoPage";
import AsesorPerfilPage from "@/pages/AsesorPerfilPage";
import MisAsesoriasPage from "@/pages/MisAsesoriasPage";
import AsesoriaDetallePage from "@/pages/AsesoriaDetallePage";
import SolicitarAsesoriaPage from "@/pages/SolicitarAsesoriaPage";
import MisMateriasPage from "@/pages/MisMateriasPage";
import PerfilPage from "@/pages/PerfilPage";
import NotFoundPage from "@/pages/NotFoundPage";

export const router = createBrowserRouter([
  // Públicas (solo sin sesión)
  {
    element: <GuestRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: "/login", element: <LoginPage /> },
          { path: "/registro", element: <RegisterPage /> },
        ],
      },
    ],
  },
  // Privadas (requieren JWT)
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: "/", element: <Navigate to="/asesores" replace /> },
          { path: "/asesores", element: <CatalogoPage /> },
          { path: "/asesores/:id", element: <AsesorPerfilPage /> },
          { path: "/asesorias", element: <MisAsesoriasPage /> },
          { path: "/asesorias/nueva/:asesorMateriaId", element: <SolicitarAsesoriaPage /> },
          { path: "/asesorias/:id", element: <AsesoriaDetallePage /> },
          { path: "/mis-materias", element: <MisMateriasPage /> },
          { path: "/perfil", element: <PerfilPage /> },
        ],
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);