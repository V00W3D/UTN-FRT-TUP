import { ProtectedRoute } from "./ProtectedRoute";
import AdminLayout from "../layouts/AdminLayout";
import Main from "../components/Admin/Main";
import AdminUsuarios from "../components/Admin/Parts/AdminUsuarios";
import AdminBeneficiarios from "../components/Admin/Parts/AdminBeneficiarios";
import AdminDonaciones from "../components/Admin/Parts/AdminDonaciones";
import AdminEntregas from "../components/Admin/Parts/AdminEntregas";
export const privateRoutes = {
  element: (
    <ProtectedRoute roles={["admin"]}>
      <AdminLayout />
    </ProtectedRoute>
  ),
  path: "/admin/*",
  children: [
    { path: "inicio", element: <Main /> },
    { path: "usuarios", element: <AdminUsuarios /> },
    { path: "beneficiarios", element: <AdminBeneficiarios /> },
    { path: "donaciones", element: <AdminDonaciones /> },
    { path: "entregas", element: <AdminEntregas /> },
  ],
};
