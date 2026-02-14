import React from "react";
import "../styles/Sections.css"; // Importa el CSS común

const idiomas = ["Español (Nativo)", "Inglés (Intermedio)"];

export default function Idiomas() {
  return (
    <section id="idiomas" className="section">
      <h2>Idiomas</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {idiomas.map((idioma, index) => (
          <div key={index} className="card">
            <h3>{idioma}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
