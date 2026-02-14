import { SmoothNavbarBuilder } from "../../../utils/SmoothNavBarBuilder";
import { useNavigate } from "react-router-dom";
import { useHomeStore } from "../../../store/useHomeStore";
import { SiSuperuser } from "react-icons/si";
export default function HomeNavBar() {
  const navigate = useNavigate();
  const { homeMode, setHomeMode } = useHomeStore();

  const handleLogout = () => {
    // Acá ponés tu logout real
    console.log("Cerrando sesión...");
    navigate("/auth/login");
  };

  return (
    <SmoothNavbarBuilder
      logo="/ong.png"
      logoText="ONG"
      basePath="/home"
      activeMode={homeMode}
      onModeChange={setHomeMode}
      buttons={[
        { label: "Inicio", mode: "inicio" },
        { label: "Campañas", mode: "campañas" },
        { label: "Historial", mode: "historial" },
        {
          label: <SiSuperuser />,
          mode: "auth",
          dropdown: [
            { label: "Iniciar Sesión", to: "/auth/login" },
            { label: "Crear Cuenta", to: "/auth/register" },
          ],
        },
      ]}
    />
  );
}
