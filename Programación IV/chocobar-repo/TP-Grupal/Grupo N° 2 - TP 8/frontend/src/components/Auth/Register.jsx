import React, { useState } from "react";
import AuthFieldBuilder from "../../utils/AuthFieldBuilder";
import AuthButton from "../../utils/AuthButton";
import { useAuthHook } from "../../hooks/useAuthHook";

export default function Register() {
  const { register, loading, error } = useAuthHook();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [rol, setRol] = useState("donante"); // valor por defecto

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(nombre, email, contraseña, rol);
    } catch (err) {
      console.error("Error al registrarse:", err.message);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">Crear cuenta</h2>

        <AuthFieldBuilder
          id="nombre"
          type="text"
          label="Nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <AuthFieldBuilder
          id="email"
          type="email"
          label="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <AuthFieldBuilder
          id="contraseña"
          type="password"
          label="Contraseña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
        />

        <div className="input-container">
          <label htmlFor="rol" style={{ fontWeight: "500" }}>
            Rol:
          </label>
          <select
            id="rol"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            className="auth-select"
          >
            <option value="donante">Donante</option>
            <option value="colaborador">Colaborador</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        {error && <p className="auth-error">{error}</p>}

        <AuthButton text="Registrarse" type="submit" loading={loading} />

        <AuthButton
          text="¿Ya tienes cuenta? Inicia sesión"
          variant="link"
          onClick={() => (window.location.href = "/auth/login")}
        />
      </form>
    </div>
  );
}
