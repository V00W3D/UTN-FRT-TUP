import { useAuthStore } from "../store/AuthStore";
import AdminHomeLayout from "../layouts/AdminHomeLayout";
import "../CSS/AdminHome.css";

const AdminHomePage = () => {
  const { user } = useAuthStore();

  if (!user || user.role !== "admin") {
    return (
      <div style={{ textAlign: "center", marginTop: "4rem" }}>
        <h2>No tenés permisos para acceder a esta página</h2>
      </div>
    );
  }

  return <AdminHomeLayout />;
};

export default AdminHomePage;
