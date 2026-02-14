import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          &copy; {new Date().getFullYear()} <strong>Gimnasio</strong> — Sistema de Gestión de Reservas
        </p>
        <p className="footer-subtext">Desarrollado por Grupo 2 · Tecnicatura Universitaria en Programación</p>
      </div>
    </footer>
  );
}

export default Footer;
