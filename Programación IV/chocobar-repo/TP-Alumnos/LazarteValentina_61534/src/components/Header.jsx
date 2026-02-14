import React from "react";

const Header = () => {
  return (
    <header
      className="text-center py-4 text-white"
      style={{
        background: "linear-gradient(135deg, #4b0082, #203a43, #1c0036)"
      }}
    >
      <img
        src="/foto.jpg"
        alt="Valentina Lazarte"
        className="img-fluid rounded-circle mb-3"
        style={{ maxWidth: "120px", height: "auto" }}
      />
      <h1 style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.7)" }}>Valentina Lazarte</h1>
      <p style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.5)" }}>Desarrolladora Full Stack</p>
      <a
        href="#experiencia"
        className="btn"
        style={{
          background: "linear-gradient(135deg, #9c27b0, #6a1b9a)",
          color: "#fff"
        }}
      >
        Ver mi experiencia
      </a>
    </header>
  );
};

export default Header;
