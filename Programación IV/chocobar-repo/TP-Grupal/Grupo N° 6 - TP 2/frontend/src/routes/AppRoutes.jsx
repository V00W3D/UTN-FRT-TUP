import { Navigate, useRoutes } from "react-router-dom";
import { authRoutes } from "./Auth.routes";
import { homeRoutes } from "./Home.routes";
import { adminRoutes } from "./AdminRoutes";

export default function AppRoutes() {
  const element = useRoutes([
    authRoutes,
    homeRoutes,
    adminRoutes,
    // 👇 Ruta por defecto: redirige a /home
    { path: "/", element: <Navigate to="/home/inicio" replace /> },
    { path: "*", element: <Navigate to="/home/inicio" replace /> },
  ]);

  return element;
}
