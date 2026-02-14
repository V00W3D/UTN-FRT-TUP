import React from "react";
import "../styles/Sections.css"; // importa el CSS común

const certificados = [
  "Bachiller en Turismo - presencial",
  "HABILIDADES DIGITALES PARA LA INCLUSION LABORAL - Informatica Basica - Certificado"
];

export default function Certificados() {
  return (
    <section id="certificados" className="section">
      <h2>Certificados</h2>
      <ul>
        {certificados.map((cert, index) => (
          <li key={index}>{cert}</li>
        ))}
      </ul>
    </section>
  );
}
