import { useState } from "react";
import { login } from "../services/autenticacion.services";
import { INICIO } from "../routers/inicio.routes";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (body) => {
    try {
      const logueo = await login(body);

      const adminData = logueo.find(adm =>
          adm.nombre === body.nombre && adm.contrasena === body.contrasena
      );

      if (!adminData) {
        throw new Error("Datos incorrectos")
        }
        
      if (adminData) {
        navigate(INICIO);
      }
    } catch (error) {
      console.error("Error al iniciar sesion");
    }
  };

  return { admin, handleLogin };
};
