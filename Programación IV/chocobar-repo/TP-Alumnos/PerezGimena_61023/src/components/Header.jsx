import React from "react";


export default function Header() {
  return (
     <header id="inicio">
      {/* Barra de navegación */}
      <nav className="barra-navegacion">
        <div className="marca">
          <span className="logo-marca">&gt; -</span>
          <span className="marca-nombre">GIMENA</span>
          
        </div>
        <ul className="enlaces-navegacion">
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#estudios">Estudios</a></li>
          <li><a href="#soft-skills">Habilidades</a></li>
           <li><a href="#experiencia">Exp-Laboral</a></li>
          <li><a href="#proyectos">Proyectos</a></li>
          <li><a href="#certificados">Certificaciones</a></li>
        </ul>
      </nav>

      {/* Sección principal */}
      <div className="header-main">
        <div className="header-text">
          <h1 className="header-name">GIMENA PEREZ</h1>
          <h2 className="header-role">DESARROLLADORA WEB</h2>
          <p className="header-description">
            ¡Hola! Soy Gimena Pérez, desarrolladora web en constante aprendizaje. Desde que descubrí el mundo de la programación, me enamoré de la creatividad y la lógica que se combinan para dar vida a proyectos digitales. Me encanta transformar ideas en experiencias interactivas, funcionales y visualmente atractivas, siempre buscando que cada línea de código cuente.

Actualmente, soy estudiante de Tecnicatura en Programación en la UTN, donde profundizo mis conocimientos en desarrollo web, bases de datos, y tecnologías modernas como React, JavaScript y CSS. 

Mi objetivo es seguir creciendo como desarrolladora, creando experiencias web que conecten con las personas y aporten valor, mientras continúo aprendiendo y compartiendo conocimientos con la comunidad tecnológica.
          </p>
        </div>
        <img
          src="/fotoperfil.jpg"
          alt="Foto personal"
          className="header-img"
        />
      </div>
    </header>
  );
}