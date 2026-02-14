import { useState, useEffect } from "react";
import { FaPowerOff } from "react-icons/fa";
import { useAuthStore } from "../store/useAuthStore";
import { useMe } from "../hooks/useMe";
import { useLogout } from "../hooks/useLogout";
import "../Styles/ProfileCard.css";

export default function ProfileCard() {
  const { user } = useAuthStore(); // 👤 obtenemos el usuario actual del store
  const { fetchUser, isLoading } = useMe(false); // no auto-fetch, lo controlamos manualmente
  const { logout } = useLogout(); // 🚪 hook para cerrar sesión
  const [hovered, setHovered] = useState(false);

  // ✅ si no hay usuario cargado, intentamos obtenerlo al montar
  useEffect(() => {
    if (!user?.nombre && !isLoading) {
      fetchUser();
    }
  }, []);

  if (!user || !user.nombre) return null; // evita render vacío

  return (
    <div
      className="profile-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={hovered ? logout : undefined}
      title={hovered ? "Cerrar sesión" : "Usuario activo"}
    >
      <div className="profile-avatar">
        {hovered ? (
          <FaPowerOff className="logout-icon" />
        ) : (
          <span>{user.nombre.charAt(0).toUpperCase()}</span>
        )}
      </div>
      <div className="profile-info">
        <p className="profile-name">
          {hovered ? "Cerrar Sesión?" : user.nombre.toUpperCase()}
        </p>
      </div>
    </div>
  );
}
