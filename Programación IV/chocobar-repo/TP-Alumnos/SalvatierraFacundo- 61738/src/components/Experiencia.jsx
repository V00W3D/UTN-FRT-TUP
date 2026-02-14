
import React from "react";

export default function Experiencia() {
  const experiencias = [
    {
      puesto: "Desarrollador Backend Java",
      empresa: "Empresa ABC",
      periodo: "Enero 2023 - Actualidad",
      descripcion: "Desarrollo de APIs REST con Spring Boot, optimización de queries en MySQL y mantenimiento de sistemas backend."
    },
    {
      puesto: "Junior Java Developer",
      empresa: "Tech Solutions",
      periodo: "Marzo 2021 - Diciembre 2022",
      descripcion: "Implementación de nuevas funcionalidades, corrección de bugs y participación en revisión de código para proyectos internos."
    }
  ];

  return (
    <section id="experiencia">
      <h2>Experiencia Laboral</h2>
      {experiencias.map((exp, index) => (
        <div className="card" key={index}>
          <h3>{exp.puesto}</h3>
          <h4>{exp.empresa} — <small>{exp.periodo}</small></h4>
          <p>{exp.descripcion}</p>
        </div>
      ))}
    </section>
  );
}
