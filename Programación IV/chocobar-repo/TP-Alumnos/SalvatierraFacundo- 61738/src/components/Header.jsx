import React from "react";
import perfil from "../assets/perfil.jpg";

export default function Header() {
  return (
    <header className="py-3 mb-4 border-bottom bg-dark text-white">
      <div className="container d-flex flex-wrap align-items-center justify-content-between">
        
        {/*Logo y nombre */}
        <div className="d-flex align-items-center mb-2 mb-md-0">
          <img
            src={perfil}
            alt="Perfil de Facundo Salvatierra"
            className="perfil-img me-3"
          />
          <span className="fs-4 fw-bold">Facundo Salvatierra</span>
        </div>

       {/*nav*/}
        <nav className="nav nav-pills">
          <a href="#sobre-mi" className="nav-link text-light">
            Sobre mi
          </a>
          <a href="#proyectos" className="nav-link text-light">
            Proyectos
          </a>
          <a href="#experiencia" className="nav-link text-light">
            Experiencia
          </a>
          <a href="#contacto" className="nav-link text-light">
            Contacto
          </a>
        </nav>
      </div>
    </header>
  );
}
