import React from "react";

export default function Experiencia() {
  const experiencias = [
    { puesto: "Indumentaria", empresa: "Masculina, Femenina", periodo: "2024-2025" },
    { puesto: "Bar", empresa: "La Estación", periodo: "2025" },
    { puesto: "Librería", empresa: "Cosas y Cositas", periodo: "2023-2024" },
    
  ];

  return (
    <section id="experiencia">
      <div className="titulo">
        <img src="/experiencia.png" alt="Experiencia" className="icono" />
        <h2>Experiencia Laboral</h2>
      </div>
      <div className="timeline">
        {experiencias.map((exp, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <span className="puesto">{exp.puesto}</span>
              <span className="empresa"> {exp.empresa}</span>
              <span className="periodo"> ({exp.periodo})</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}