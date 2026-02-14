import { useState } from "react";
import { useUser } from "../hooks/useUser";

const FormularioRegistro = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState(null);
  const { register } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);
    const success = await register({ nombre, password, email });
    if (success) {
      setMensaje({ tipo: "success", texto: "Usuario registrado correctamente. Ahora podés iniciar sesión." });
      setNombre("");
      setEmail("");
      setPassword("");
    } else {
      setMensaje({ tipo: "error", texto: "Hubo un error al registrar el usuario" });
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="container-form">
        <h3>Registro</h3>
        <div>
          <h5>Nombre completo</h5>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingresa tu nombre completo..."
            required
          />
        </div>
        <div>
          <h5>Email</h5>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa tu email..."
          />
        </div>
        <div>
          <h5>Contraseña</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña..."
            required
          />
        </div>
        {mensaje && (
          <p style={{ color: mensaje.tipo === "success" ? "green" : "red" }}>
            {mensaje.texto}
          </p>
        )}
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default FormularioRegistro;
