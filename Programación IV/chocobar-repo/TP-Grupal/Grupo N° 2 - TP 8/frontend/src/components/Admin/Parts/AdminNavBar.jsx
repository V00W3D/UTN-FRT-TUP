import { SmoothNavbarBuilder } from "../../../utils/SmoothNavBarBuilder";
import { useAdminHomeStore } from "../../../store/useAdminHomeStore";
import { SiSuperuser } from "react-icons/si";
export default function AdminNavBar() {
  const { adminMode, setAdminMode } = useAdminHomeStore();

  return (
    <SmoothNavbarBuilder
      logo="/ong.png"
      logoText="ONG"
      basePath="/admin"
      activeMode={adminMode}
      onModeChange={setAdminMode}
      buttons={[
        { label: "Usuarios", mode: "usuarios" },
        { label: "Beneficiarios", mode: "beneficiarios" },
        { label: "Donaciones", mode: "donaciones" },
        { label: "Entregas", mode: "entregas" },
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
