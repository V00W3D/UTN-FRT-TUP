// src/pages/Auth/Login.jsx
import { useState } from "react";
import "../../Styles/AuthLayout.css";
import AuthFieldBuilder from "../../common/FormBuilder/AuthFieldBuilder";
import AuthButton from "../../common/FormBuilder/AuthButton";
import { useLogin } from "../../hooks/useLogin";

export default function Login() {
  document.title = "Hospital - Login";
  const [nombre, setNombre] = useState("");
  const [contraseña, setContraseña] = useState("");
  const { login, isLoading, isError, isSuccess, errorMessage } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(nombre, contraseña);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="auth-form">
        <h2 className="auth-title">Iniciar Sesión</h2>

        {/* Mensajes de estado */}
        {isError && <p className="auth-error">⚠️ {errorMessage}</p>}
        {isSuccess && <p className="auth-success">✅ ¡Inicio exitoso!</p>}

        <AuthFieldBuilder
          id="nombre"
          label="Nombre de usuario"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          disabled={isLoading}
        />

        <AuthFieldBuilder
          id="contraseña"
          label="Contraseña"
          type="password"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          disabled={isLoading}
        />

        <AuthButton
          type="submit"
          text={isLoading ? "Ingresando..." : "Ingresar"}
          variant="primary"
          disabled={isLoading}
        />
      </form>
    </div>
  );
}
