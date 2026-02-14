import React from "react";

export default function footer() {
  return (
    <footer id="footer">
      <h1>Contacto</h1>
      <div className="footer-iconos">
        <a href="https://github.com/hernandezsolana08-droid" target="_blank" rel="noopener noreferrer">
          <img src="/Github.png" alt="GitHub" className="icono-footer" />
        </a>
        <a href="https://www.instagram.com/solaaannnna?igsh=NjZzOHY3NW5udGVi&utm_source=qr" target="_blank" rel="noopener noreferrer">
          <img src="/instagram.png" alt="Instagram" className="icono-footer" />
        </a>
      </div>
      <p>© 2025 Solana Hernandez</p>
    </footer>
  );
}