// src/hooks/LoginHook.js
import { useAuthStore } from "../store/AuthStore";
import { usePageStore } from "../store/PageStore";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

const useLogin = () => {
  const { setUser } = useAuthStore();
  const { setPage } = usePageStore();

  const login = async (correo, password) => {
    try {
  // Consultar usuarios por correo
      const params = new URLSearchParams({ correo });
      const res = await fetch(`${API_BASE}/users?${params.toString()}`);
      if (!res.ok) return { ok: false, message: "Error al consultar usuarios." };

      const list = await res.json();
      const user = list.find((u) => u.password === password);

      if (!user) return { ok: false, message: "Credenciales incorrectas." };

      setUser(user);

  // guardar un id simple para otros componentes que dependen de localStorage userId
      try {
        localStorage.setItem("userId", String(user.id ?? user.dni ?? ""));
      } catch {
        // ignore
      }

      switch (user.role) {
        case "admin":
          setPage("adminhome");
          break;
        case "user":
        default:
          setPage("studenthome");
          break;
      }

      return { ok: true, user };
    } catch (err) {
      console.error("Login error:", err);
      try { alert("Error de conexión al iniciar sesión: " + (err?.message || err)); } 
      catch {
      return { ok: false, message: "Error de conexión al iniciar sesión." };
      }
    }
  };

  return { login };
};

export default useLogin;
