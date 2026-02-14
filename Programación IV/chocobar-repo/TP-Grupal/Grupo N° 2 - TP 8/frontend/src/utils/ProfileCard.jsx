import { useState } from "react";
import { FaPowerOff } from "react-icons/fa";
import { useAuthHook } from "../hooks/useAuthHook";
import "../CSS/ProfileCard.css";

export default function ProfileCard() {
  const { usuario, logout } = useAuthHook();
  const [hovered, setHovered] = useState(false);

  if (!usuario) return null;

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
          <span>{usuario.nombre?.charAt(0).toUpperCase()}</span>
        )}
      </div>
      <div className="profile-info">
        <p className="profile-name">
          {hovered ? "Cerrar Sesión?" : usuario.nombre?.toUpperCase()}
        </p>
      </div>
    </div>
  );
}
