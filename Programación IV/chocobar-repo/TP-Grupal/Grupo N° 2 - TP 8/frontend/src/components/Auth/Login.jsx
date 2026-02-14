import { useState } from "react";
import AuthFieldBuilder from "../../utils/AuthFieldBuilder";
import AuthButton from "../../utils/AuthButton";
import { useAuthHook } from "../../hooks/useAuthHook";

export default function Login() {
  const { login, loading, error } = useAuthHook();

  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, contraseña);
    } catch (err) {
      console.error("Error al iniciar sesión:", err.message);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">Iniciar Sesión</h2>

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

        {error && <p className="auth-error">{error}</p>}

        <AuthButton text="Iniciar sesión" type="submit" loading={loading} />

        <AuthButton
          text="¿No tienes cuenta? Regístrate"
          variant="link"
          onClick={() => (window.location.href = "/auth/register")}
        />
      </form>
    </div>
  );
}
