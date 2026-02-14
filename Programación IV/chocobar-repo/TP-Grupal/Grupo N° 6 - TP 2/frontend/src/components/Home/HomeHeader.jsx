// src/pages/Home/Parts/HomeHeader.jsx
import { useNavigate } from "react-router-dom";
import ProfileCard from "../../common/ProfileCard";
import { HomeNavBar } from "./Parts/HomeNavBar";
import AuthButton from "../../common/FormBuilder/AuthButton";

export default function HomeHeader() {
  const navigate = useNavigate();

  return (
    <header className="home-header-container">
      <div className="home-header-left">
        <ProfileCard />
      </div>

      <div className="home-header-center">
        <HomeNavBar />
      </div>

      <div
        className="home-header-right"
        style={{ display: "flex", gap: "0.5rem" }}
      >
        {/* Botón para ir a Login */}
        <AuthButton
          text="Iniciar Sesión"
          onClick={() => navigate("/auth/login")}
          variant="primary"
        />

        {/* Botón para ir a Registro */}
        <AuthButton
          text="Registrarse"
          onClick={() => navigate("/auth/register")}
          variant="primary"
        />
      </div>
    </header>
  );
}
