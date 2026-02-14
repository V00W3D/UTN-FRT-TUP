import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SmoothNavbarBuilder } from "../../../common/SmoothNavBarBuilder";
import logo from "../../../assets/react.svg"; // reemplazalo por tu logo real

export function HomeNavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Detecta cuál es el modo activo según la ruta actual
  const initialMode = location.pathname.includes("turnos")
    ? "turnos"
    : "solicitar";

  const [activeMode, setActiveMode] = useState(initialMode);

  const handleModeChange = (mode) => {
    setActiveMode(mode);
    navigate(`/home/${mode}`);
  };

  const buttons = [
    { mode: "solicitar", label: "Solicitar Turno" },
    { mode: "turnos", label: "Mis Turnos" },
  ];

  return (
    <SmoothNavbarBuilder
      logo={logo}
      logoText=""
      basePath="/home"
      buttons={buttons}
      activeMode={activeMode}
      onModeChange={handleModeChange}
    />
  );
}
