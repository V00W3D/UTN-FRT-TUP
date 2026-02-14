import { useState } from "react";
import useRegister from "../../hooks/RegisterHook";
import "../../CSS/AuthLayout.css";
import { useAuthUIStore } from "../../store/AuthUIStore";
import logo from "../../../img/logo1.png"

const RegisterForm = () => {
  const [Nombre, setNombre] = useState("");
  const [Correo, setCorreo] = useState("");
  const [Dni, setDni] = useState("");
  const [Pass, setPass] = useState("");
  const { register } = useRegister();
  const { setFormMode } = useAuthUIStore();

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await register({
      nombre: Nombre,
      correo: Correo,
      dni: Dni,
      password: Pass,
    });

    if (res.ok) {
      alert("Registro completado correctamente 🎉");
      setNombre("");
      setCorreo("");
      setDni("");
      setPass("");
      setFormMode("login");
    } else {
      alert(res.message || "Error al registrar.");
    }
  };

  return (
    <form onSubmit={handleRegister} className="formauth">
      <img src={logo} alt="Academia Logo" />
      <h1>Registrarse</h1>

      <div className="input-container">
        <input
          type="text"
          id="Nombre"
          name="Nombre"
          placeholder=" "
          value={Nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <label htmlFor="Nombre">Nombre Completo</label>
      </div>

      <div className="input-container">
        <input
          type="email"
          id="Correo"
          name="Correo"
          placeholder=" "
          value={Correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        <label htmlFor="Correo">Correo Electrónico</label>
      </div>

      <div className="input-container">
        <input
          type="text"
          id="Dni"
          name="Dni"
          placeholder=" "
          value={Dni}
          onChange={(e) => setDni(e.target.value)}
          required
        />
        <label htmlFor="Dni">DNI</label>
      </div>

      <div className="input-container">
        <input
          type="password"
          id="Pass"
          name="Pass"
          placeholder=" "
          value={Pass}
          onChange={(e) => setPass(e.target.value)}
          required
        />
        <label htmlFor="Pass">Contraseña</label>
      </div>

      <button type="submit">Crear Cuenta</button>
    </form>
  );
};

export default RegisterForm;
