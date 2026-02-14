import React from "react";

export default function Footer() {
  return (
    <footer id="footer">
      <h1>Contacto</h1>
      <div className="footer-iconos">
        <a href="https://www.linkedin.com/in/maria-gimena-perez-a18a0b2a9/" target="_blank" rel="noopener noreferrer">
          <img src="/linkedin.png" alt="LinkedIn" className="icono-footer" />
        </a>
        <a href="https://github.com/PerezGimena" target="_blank" rel="noopener noreferrer">
          <img src="/github.png" alt="GitHub" className="icono-footer" />
        </a>
        <a href="https://www.instagram.com/gimeeperez.ok/" target="_blank" rel="noopener noreferrer">
          <img src="/instagram.png" alt="Instagram" className="icono-footer" />
        </a>
      </div>
      <p>© 2025 Gimena Perez</p>
    </footer>
  );
}