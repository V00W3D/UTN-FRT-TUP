// src/hooks/useLogout.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthServices } from "../services/AuthServices";
import { useAuthStore } from "../store/useAuthStore";

export const useLogout = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuthStore();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const logout = async () => {
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);
    setErrorMessage("");

    try {
      const res = await AuthServices.logout();

      if (!res.ok) {
        setIsError(true);
        setErrorMessage(res.message || "Error al cerrar sesión");
        return;
      }

      // 🧹 Limpiar todo
      localStorage.removeItem("cupcake");
      localStorage.removeItem("cake");
      setUser(null);
      setToken(null);

      setIsSuccess(true);

      // 🔀 Redirigir al login
      setTimeout(() => navigate("/auth/login", { replace: true }), 700);
    } catch (err) {
      console.error("[useLogout] Error:", err);
      setIsError(true);
      setErrorMessage(
        err.response?.data?.message || "No se pudo cerrar la sesión."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { logout, isLoading, isError, isSuccess, errorMessage };
};
