// src/App.jsx
import { useEffect } from "react";
import { useAuthStore } from "./store/AuthStore";
import { usePageStore } from "./store/PageStore";

import AuthLayout from "./layouts/AuthLayout";
import AdminHome from "./pages/AdminHomePage";
import StudentHome from "./pages/StudentHomePage";
import { useUsers } from "./hooks/UsersHook";
const App = () => {
  useUsers();
  const { user } = useAuthStore();
  const { page, setPage } = usePageStore();
  // 🔒 Redirección automática según sesión y rol
  useEffect(() => {
    if (!user) {
      setPage("auth");
    } else {
      switch (user.role) {
        case "admin":
          setPage("adminhome");
          break;
        case "user":
        default:
          setPage("studenthome");
          break;
      }
    }
  }, [user, setPage]);

  return (
    <>
      {page === "auth" && <AuthLayout />}
      {page === "adminhome" && <AdminHome />}
      {page === "studenthome" && <StudentHome />}
    </>
  );
};

export default App;
