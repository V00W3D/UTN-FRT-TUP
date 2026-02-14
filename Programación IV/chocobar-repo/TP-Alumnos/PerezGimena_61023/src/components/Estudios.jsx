import React from "react";

export default function Estudios() {
  const estudios = [
    "Instituto Privado La Asunción (Secundaria)",
    "Universidad Tecnológica Nacional - Facultad Regional Tucumán (Universidad)",
    "Curso de Front End Developer- EducacionIT"
  ];

  return (
    <section id="estudios">
      <div className="titulo">
        <img src="/educacion.png" alt="Educación" className="icono" />
        <h2>Mis Estudios</h2>
      </div>
      <ul>
        {estudios.map((est, index) => (
          <li key={index}>{est}</li>
        ))}
      </ul>
    </section>
  );
}