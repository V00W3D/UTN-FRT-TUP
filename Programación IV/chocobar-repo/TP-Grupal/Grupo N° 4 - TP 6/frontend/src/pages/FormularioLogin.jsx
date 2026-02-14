import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";

const FormularioLogin = () => {
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const success = await login({ nombre, password });
    if (!success) {
      setError("Nombre o contraseña incorrectos");
      setPassword("");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="container-form">
        <h3>Login</h3>

        <div>
          <h5>Nombre completo</h5>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            placeholder="Ingresa tu nombre completo..."
          />
        </div>

        <div>
          <h5>Contraseña</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Ingresa tu contraseña..."
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Ingresar</button>

        <p style={{ marginTop: "10px", textAlign: "center" }}>
          ¿No tenés cuenta? <Link to="/registro">Registrate aquí</Link>
        </p>
      </form>
    </div>
  );
};

export default FormularioLogin;
