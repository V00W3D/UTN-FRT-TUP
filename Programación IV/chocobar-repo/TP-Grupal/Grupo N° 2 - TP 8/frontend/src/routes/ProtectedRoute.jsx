import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export function ProtectedRoute({ children, roles }) {
  const { usuario } = useAuthStore();

  if (!usuario) {
    // No está logueado, redirige al login
    return <Navigate to="/auth/login" replace />;
  }

  // Si la ruta requiere roles específicos
  if (roles && !roles.includes(usuario.rol)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
