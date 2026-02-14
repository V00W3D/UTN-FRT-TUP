import { Navigate, useRoutes } from "react-router-dom";
import { publicRoutes } from "./Public.routes";
import { privateRoutes } from "./Private.routes";
import { authRoutes } from "./Auth.routes";

export default function AppRoutes() {
  const element = useRoutes([
    publicRoutes,
    privateRoutes,
    authRoutes,
    // 👇 Ruta por defecto: redirige a /home
    { path: "/", element: <Navigate to="/home/inicio" replace /> },
    { path: "*", element: <Navigate to="/home/inicio" replace /> },
  ]);

  return element;
}
