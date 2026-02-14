import React from "react";
import "../styles/Sections.css";

const estudios = [
  { titulo: "Tecnicatura en Programación", año: 2025 },
  { titulo: "Bachiller en Turismo", año: 2022 },
];

export default function Estudios() {
  return (
    <section id="estudios" className="section">
      <h2>Estudios</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {estudios.map((estudio, index) => (
          <div key={index} className="card">
            <h3>{estudio.titulo}</h3>
            <p>{estudio.año}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
