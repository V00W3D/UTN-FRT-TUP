import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SmoothNavbarBuilder } from "../../../common/SmoothNavBarBuilder";
import logo from "../../../assets/react.svg"; // ajustá la ruta según tu proyecto

export function AuthNavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Detecta modo inicial según la ruta actual (para mantener el efecto visual)
  const initialMode = location.pathname.includes("register")
    ? "register"
    : "login";

  const [activeMode, setActiveMode] = useState(initialMode);

  const handleModeChange = (mode) => {
    setActiveMode(mode);
    navigate(`/auth/${mode}`); // 👈 así sí va al login o registro correcto
  };

  const buttons = [
    { mode: "login", label: "Iniciar Sesión" },
    { mode: "register", label: "Registrarse" },
  ];

  return (
    <SmoothNavbarBuilder
      logo={logo}
      logoText=""
      basePath="/auth"
      buttons={buttons}
      activeMode={activeMode}
      onModeChange={handleModeChange}
    />
  );
}
