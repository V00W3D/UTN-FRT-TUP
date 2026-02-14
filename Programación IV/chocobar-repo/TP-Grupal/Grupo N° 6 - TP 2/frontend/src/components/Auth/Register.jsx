// src/pages/Auth/Registro.jsx
import { useState } from "react";
import "../../Styles/AuthLayout.css";
import AuthFieldBuilder from "../../common/FormBuilder/AuthFieldBuilder";
import AuthButton from "../../common/FormBuilder/AuthButton";
import { useRegister } from "../../hooks/useRegister";

export default function Register() {
  document.title = "Hospital - Register";

  const [nombre, setNombre] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");

  const { register, isLoading, isError, isSuccess, errorMessage } =
    useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register({ nombre, contraseña, correo, telefono });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="auth-form">
        <h2 className="auth-title">Registrar Usuario</h2>

        {/* Estados */}
        {isError && <p className="auth-error">⚠️ {errorMessage}</p>}
        {isSuccess && (
          <p className="auth-success">✅ Usuario registrado correctamente</p>
        )}

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

        <AuthFieldBuilder
          id="correo"
          label="Correo electrónico"
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          disabled={isLoading}
        />

        <AuthFieldBuilder
          id="telefono"
          label="Teléfono"
          type="tel"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          disabled={isLoading}
        />

        <AuthButton
          type="submit"
          text={isLoading ? "Registrando..." : "Registrarse"}
          variant="primary"
          disabled={isLoading}
        />
      </form>
    </div>
  );
}
