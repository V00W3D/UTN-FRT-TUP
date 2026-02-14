import { ProtectedRoute } from "./ProtectedRoute";
// import AdminLayout from "../layouts/AdminLayout";
// import Main from "../components/Admin/Main";
// import AdminUsuarios from "../components/Admin/Parts/AdminUsuarios";
// import AdminBeneficiarios from "../components/Admin/Parts/AdminBeneficiarios";
// import AdminDonaciones from "../components/Admin/Parts/AdminDonaciones";
import AdminPage from "../pages/AdminPage";
import AdminInicio from "../components/Admin/AdminInicio";
import { ProfesionalesTable } from "../components/Admin/Parts/ProfesionalesTable";
export const adminRoutes = {
  element: (
    <ProtectedRoute roles={[1]}>
      <AdminPage />
    </ProtectedRoute>
  ),
  path: "/admin/*",
  children: [
    { path: "inicio", element: <AdminInicio /> },
    { path: "pacientes", element: null },
    { path: "profesionales", element: <ProfesionalesTable /> },
    { path: "turnos", element: null },
    { path: "especialidades", element: null },
  ],
};
