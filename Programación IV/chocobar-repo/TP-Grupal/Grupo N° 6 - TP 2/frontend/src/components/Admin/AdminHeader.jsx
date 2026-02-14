import { useNavigate } from "react-router-dom";
import ProfileCard from "../../common/ProfileCard";
import { AdminNavBar } from "./Parts/AdminNavBar";
import AuthButton from "../../common/FormBuilder/AuthButton";

export default function AdminHeader() {
  const navigate = useNavigate();

  return (
    <header className="admin-header-container">
      <div className="admin-header-left">
        <ProfileCard />
      </div>

      <div className="admin-header-center">
        <AdminNavBar />
      </div>

      <div
        className="admin-header-right"
        style={{ display: "flex", gap: "0.5rem" }}
      >
        {/* Botón para volver al Home */}
        <AuthButton
          text="Volver al Inicio"
          onClick={() => navigate("/home")}
          variant="secondary"
        />

        {/* Botón para cerrar sesión */}
        <AuthButton
          text="Cerrar Sesión"
          onClick={() => navigate("/auth/logout")}
          variant="danger"
        />
      </div>
    </header>
  );
}
