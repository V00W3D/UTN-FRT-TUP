import { DonarModal } from "../components/Home/Parts/Modals/DonarModal";
import MainLayout from "../layouts/MainLayout";
import Campañas from "../components/Home/Parts/Campañas";
import Main from "../components/Home/Main";
import Historial from "../components/Home/Parts/Historial";
export const publicRoutes = {
  element: <MainLayout />,
  path: "/home",
  children: [
    { path: "inicio", element: <Main /> },
    { path: "campañas", element: <Campañas /> },
    { path: "historial", element: <Historial /> },
    { path: "donar", element: <DonarModal /> },
  ],
};
