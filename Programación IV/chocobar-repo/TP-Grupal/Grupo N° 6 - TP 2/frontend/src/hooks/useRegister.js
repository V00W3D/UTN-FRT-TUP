// src/hooks/useRegister.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthServices } from "../services/AuthServices";

export const useRegister = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const register = async ({
    nombre,
    contraseña,
    correo,
    telefono,
    imagen = "",
    fechanacimiento = null,
  }) => {
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);
    setErrorMessage("");

    try {
      const res = await AuthServices.register({
        nombre,
        contraseña,
        correo,
        telefono,
        imagen,
        fechanacimiento,
      });

      if (!res.ok) {
        setIsError(true);
        setErrorMessage(res.message || "Error desconocido al registrarse");
        return;
      }

      setIsSuccess(true);

      // 🧭 Redirigir al login después de un pequeño delay
      setTimeout(() => navigate("/auth/login"), 1000);
    } catch (err) {
      console.error("[useRegister] Error:", err);
      setIsError(true);
      setErrorMessage(
        err.response?.data?.message || "No se pudo registrar el usuario."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, isError, isSuccess, errorMessage };
};
