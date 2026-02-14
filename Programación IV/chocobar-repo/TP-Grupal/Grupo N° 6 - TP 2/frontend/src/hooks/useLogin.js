// src/hooks/useLogin.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthServices } from "../services/AuthServices";
import { useAuthStore } from "../store/useAuthStore";
import { useMe } from "./useMe";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setToken, clearAuth } = useAuthStore();
  const { fetchUser } = useMe(false); // 👈 usamos el hook pero sin autoFetch

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const login = async (nombre, contraseña) => {
    clearAuth();
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);
    setErrorMessage("");

    try {
      const res = await AuthServices.login({ nombre, contraseña });

      if (!res.ok) {
        setIsError(true);
        setErrorMessage(res.message || "Error desconocido al iniciar sesión");
        return;
      }

      console.log("[useLogin] Tokens recibidos:", res.desserts);

      const cupcake = res.desserts?.cupcake;
      const cake = res.desserts?.cake;

      localStorage.setItem("cupcake", cupcake);
      localStorage.setItem("cake", cake);
      setToken({ cupcake, cake });

      // 🔁 Usar useMe para cargar y validar el usuario real
      const userData = await fetchUser(false);
      if (!userData) throw new Error("No se pudo cargar el usuario.");

      console.log("[useLogin] Usuario autenticado:", userData);

      setIsSuccess(true);

      // 🚀 Redirigir según el rol
      setTimeout(() => {
        if (userData.RolID === 1 || userData.rol === 1)
          navigate("/admin/inicio");
        else navigate("/home/inicio");
      }, 700);
    } catch (err) {
      console.error("[useLogin] Error:", err);
      setIsError(true);
      setErrorMessage(
        err.response?.data?.message || "No se pudo iniciar sesión."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, isError, isSuccess, errorMessage };
};
