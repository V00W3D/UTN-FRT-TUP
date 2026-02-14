import { useNavigate } from "react-router-dom";
import { useAuthServices } from "../services/useAuthServices";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";

export function useAuthHook() {
  const navigate = useNavigate();
  const { usuario, ui, setUsuario, clearUsuario, setUI } = useAuthStore();

  // 🔹 Al montar el hook, intenta recuperar el usuario del localStorage
  useEffect(() => {
    const storedUser = getUsuario();
    if (storedUser && !usuario) setUsuario(storedUser);
  }, []);

  // =========================================================
  // 🧠 Lógica para obtener usuario desde localStorage
  // =========================================================
  const getUsuario = () => {
    try {
      const userData = localStorage.getItem("usuario");
      if (!userData) return null;
      const parsedUser = JSON.parse(userData);
      if (parsedUser && typeof parsedUser === "object") {
        return parsedUser;
      } else {
        localStorage.removeItem("usuario"); // si está corrupto
        return null;
      }
    } catch (err) {
      console.error("Error al obtener usuario del localStorage:", err);
      return null;
    }
  };

  // =========================================================
  // 🔑 Login
  // =========================================================
  const login = async (email, contraseña) => {
    setUI({ loading: true, error: null });
    try {
      const user = await useAuthServices.login(email, contraseña);
      setUsuario(user);
      localStorage.setItem("usuario", JSON.stringify(user)); // ✅ guardar sesión
      setUI({ loading: false });
      const destino = user.rol === "admin" ? "/admin/inicio" : "/home/inicio";
      navigate(destino);
      return user;
    } catch (err) {
      setUI({ loading: false, error: err.message });
      throw err;
    }
  };

  // =========================================================
  // 📝 Registro
  // =========================================================
  const register = async (nombre, email, contraseña, rol) => {
    setUI({ loading: true, error: null });
    try {
      const user = await useAuthServices.register(
        nombre,
        email,
        contraseña,
        rol
      );
      setUsuario(user);
      localStorage.setItem("usuario", JSON.stringify(user)); // ✅ persistir
      setUI({ loading: false });
      navigate("/auth/login");
      return user;
    } catch (err) {
      setUI({ loading: false, error: err.message });
      throw err;
    }
  };

  // =========================================================
  // 🚪 Logout
  // =========================================================
  const logout = () => {
    useAuthServices.logout();
    clearUsuario();
    localStorage.removeItem("usuario");
    navigate("/auth/login");
  };

  // =========================================================
  // ⚙️ Obtener rol actual
  // =========================================================
  const getRol = () => {
    const rol = useAuthServices.getRol();
    if (!rol) navigate("/auth/login");
    return rol;
  };

  return {
    usuario,
    loading: ui.loading,
    error: ui.error,
    login,
    register,
    logout,
    getRol,
    getUsuario, // ✅ ahora disponible
  };
}
