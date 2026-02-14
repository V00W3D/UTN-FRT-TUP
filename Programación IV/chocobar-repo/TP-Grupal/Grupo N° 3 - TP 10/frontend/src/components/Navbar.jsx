import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left" onClick={() => navigate("/home")}>
        💈 Peluquería
      </div>

      <ul className="navbar-links">
        <li>
          <a href="#clientes">Clientes</a>
        </li>
        <li>
          <a href="#servicios">Servicios</a>
        </li>
        <li>
          <a href="#turnos">Turnos</a>
        </li>
        <li>
          <a href="#turnos-hoy">Turnos Hoy</a>
        </li>
        <li>
          <a href="#historial">Historial</a>
        </li>
      </ul>

      <button className="logout-btn" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </nav>
  );
}
