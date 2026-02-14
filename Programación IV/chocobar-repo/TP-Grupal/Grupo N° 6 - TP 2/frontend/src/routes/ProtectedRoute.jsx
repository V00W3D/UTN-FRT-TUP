import { useAuthStore } from "../store/useAuthStore";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children, roles }) {
  const { user } = useAuthStore();

  if (!user) return <Navigate to="/auth/login" replace />;

  // Comparar con user.rol ya normalizado
  if (roles && !roles.includes(user.rol)) {
    console.warn("[ProtectedRoute] Rol no autorizado:", user);
    return <Navigate to="/" replace />;
  }

  return children;
}
