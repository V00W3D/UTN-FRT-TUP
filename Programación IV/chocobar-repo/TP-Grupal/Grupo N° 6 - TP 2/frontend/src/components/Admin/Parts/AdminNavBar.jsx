import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SmoothNavbarBuilder } from "../../../common/SmoothNavBarBuilder";
import logo from "../../../assets/react.svg"; // reemplazalo por tu logo real

export function AdminNavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Detecta el modo activo según la ruta actual
  const path = location.pathname;
  const initialMode = path.includes("pacientes")
    ? "pacientes"
    : path.includes("profesionales")
    ? "profesionales"
    : path.includes("especialidades")
    ? "especialidades"
    : "turnos";

  const [activeMode, setActiveMode] = useState(initialMode);

  const handleModeChange = (mode) => {
    setActiveMode(mode);
    navigate(`/admin/${mode}`);
  };

  const buttons = [
    { mode: "pacientes", label: "Pacientes" },
    { mode: "profesionales", label: "Profesionales" },
    { mode: "especialidades", label: "Especialidades" },
    { mode: "turnos", label: "Turnos" },
  ];

  return (
    <SmoothNavbarBuilder
      logo={logo}
      logoText="Panel Admin"
      basePath="/admin"
      buttons={buttons}
      activeMode={activeMode}
      onModeChange={handleModeChange}
    />
  );
}
