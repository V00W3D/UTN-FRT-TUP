import HomePage from "../pages/HomePage";
import Inicio from "../components/Home/Inicio";
import SolicitarTurno from "../components/Home/Parts/SolicitarTurnoForm";
import MisTurnosTable from "../components/Home/Parts/MisTurnosTable";
export const homeRoutes = {
  path: "/home",
  element: <HomePage />,
  children: [
    { path: "inicio", element: <Inicio /> },
    { path: "solicitar", element: <SolicitarTurno /> },
    { path: "turnos", element: <MisTurnosTable /> },
  ],
};
