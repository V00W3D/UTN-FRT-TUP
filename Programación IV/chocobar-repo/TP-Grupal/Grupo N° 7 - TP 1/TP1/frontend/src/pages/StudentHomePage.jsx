// src/pages/StudentHomePage.jsx
import { useAuthStore } from "../store/AuthStore";
import StudentHomeLayout from "../layouts/StudentHomeLayout";
import "../CSS/StudentHome.css";

const StudentHomePage = () => {
  const { user } = useAuthStore();

  if (!user || user.role !== "user") {
    return (
      <div style={{ textAlign: "center", marginTop: "4rem" }}>
        <h2>No tenés permisos para acceder a esta página</h2>
      </div>
    );
  }

  return <StudentHomeLayout />;
};

export default StudentHomePage;
