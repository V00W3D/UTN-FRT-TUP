import React from "react";
import "../styles/Sections.css"; // Importa el CSS común para todas las secciones

const experiencias = [
  { puesto: "Editora audiovisual", empresa: "X", año: 2024 },
  { puesto: "Administrador de sitio web", empresa: "DISTRIBUIDORA LOOK TUCUMAN", año: 2025 },
];

export default function Experiencia() {
  return (
    <section id="experiencia" className="section">
      <h2>Experiencia Laboral</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {experiencias.map((exp, index) => (
          <div key={index} className="card">
            <h3>{exp.puesto}</h3>
            <p>{exp.empresa}</p>
            <p>{exp.año}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
