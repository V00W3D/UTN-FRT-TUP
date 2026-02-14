// src/hooks/useMe.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthServices } from "../services/AuthServices";
import { useAuthStore } from "../store/useAuthStore";

export const useMe = (autoFetch = true) => {
  const navigate = useNavigate();
  const { setUser, setToken, clearAuth } = useAuthStore();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchUser = async (redirectOnFail = true) => {
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);
    setErrorMessage("");

    try {
      const res = await AuthServices.Me();

      if (!res.ok) {
        if (redirectOnFail) {
          clearAuth?.();
          localStorage.removeItem("cupcake");
          localStorage.removeItem("cake");
          navigate("/auth/login");
        }

        setIsError(true);
        setErrorMessage(res.message || "No se pudo verificar la sesión");
        return null;
      }

      // 🧠 Normalizar usuario
      const raw = res.user || {};
      const userData = {
        id: raw.UserID || raw.id || null,
        nombre: raw.Nombre || raw.nombre || "Desconocido",
        rol: raw.RolID || raw.rol || raw.role || 0,
        imagen: raw.Imagen || raw.imagen || "",
      };

      setUser(userData);

      // 🔁 Actualizar tokens
      if (res.desserts?.cupcake || res.desserts?.cake) {
        const cupcake =
          res.desserts?.cupcake || localStorage.getItem("cupcake");
        const cake = res.desserts?.cake || localStorage.getItem("cake");

        localStorage.setItem("cupcake", cupcake);
        localStorage.setItem("cake", cake);
        setToken({ cupcake, cake });
      }

      console.log("[useMe] Usuario validado:", userData);
      setIsSuccess(true);
      return userData;
    } catch (err) {
      console.error("[useMe] Error:", err);

      if (redirectOnFail) {
        clearAuth?.();
        localStorage.removeItem("cupcake");
        localStorage.removeItem("cake");
        navigate("/auth/login");
      }

      setIsError(true);
      setErrorMessage(
        err.response?.data?.message || "Error interno al validar sesión"
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) fetchUser();
  }, [autoFetch]);

  return { fetchUser, isLoading, isError, isSuccess, errorMessage };
};
