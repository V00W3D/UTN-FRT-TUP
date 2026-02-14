import React from "react";
import "../App.css";

const Main = () => {
  return (
    <main className="container mt-5">
      <section id="presentacion">
        <h2>Sobre mi</h2>
        <p>
          ¡Hola! Soy Facundo Salvatierra, desarrollador apasionado por crear
          soluciones eficientes con Java y React. Me encanta aprender nuevas
          tecnologías y trabajar en proyectos que desafíen mi creatividad.
        </p>
      </section>

      <section id="estudios">
        <h2>Estudios</h2>
        <ul>
          <li>Tecnicatura en Programacion - UTN-FRT</li>
          <li>Curso de JAVA Basico e Intermedio - Todocode</li>
          <li>Curso de SpringBoot - CodeAcademy</li>
        </ul>
      </section>

      <section id="softskills">
        <h2>Soft Skills</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card bg-dark border-success text-center p-3">
              <p>Trabajo en equipo</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-dark border-success text-center p-3">
              <p>Comunicación efectiva</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-dark border-success text-center p-3">
              <p>Adaptabilidad</p>
            </div>
          </div>
        </div>
      </section>

      <section id="idiomas">
        <h2>Idiomas</h2>
        <ul>
          <li>Español — Nativo</li>
          <li>Inglés — Intermedio</li>
        </ul>
      </section>

      <section id="certificados">
        <h2>Certificados</h2>
        <ul>
          <li>Desarrollo Web Full Stack — Coderhouse</li>
          <li>Introducción a Bases de Datos — Oracle Academy</li>
        </ul>
      </section>
    </main>
  );
};

export default Main;
