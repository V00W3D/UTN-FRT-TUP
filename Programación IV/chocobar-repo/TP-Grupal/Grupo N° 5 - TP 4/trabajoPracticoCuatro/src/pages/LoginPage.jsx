import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import "../Styles/LoginStyles.css";

const LoginPage = () => {
    const [nombre, setNombre] = useState("")
    const [contrasena, setContrasena] = useState("")
    const {admin, handleLogin} = useLogin()

    const handleSubmit = (e) => {
        e.preventDefault()
        handleLogin({nombre, contrasena})
    }

  return (
    <div className="containerLogin">
      <form className="formLogin" onSubmit={handleSubmit}>
        <p className="tituloLogin">Inicio de sesión</p>
        <input type="text" placeholder="Ingrese su nombre" onChange={(e) => setNombre(e.target.value)}/>
        <input type="password" placeholder="Ingrese su contraseña" onChange={(e) => setContrasena(e.target.value)}/>
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default LoginPage;
