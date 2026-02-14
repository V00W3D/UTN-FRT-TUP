import { SmoothNavbarBuilder } from "../../utils/SmoothNavBarBuilder";
import { useAuthStore } from "../../store/useAuthStore";

export default function AuthNavBar() {
  const { authMode, setAuthMode } = useAuthStore();

  return (
    <SmoothNavbarBuilder
      basePath="/auth"
      activeMode={authMode}
      onModeChange={setAuthMode}
      buttons={[
        { label: "Iniciar Sesión", mode: "login" },
        { label: "Registrarse", mode: "register" },
      ]}
    />
  );
}
