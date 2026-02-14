import React from "react";

export default function Estudios() {
  const estudios = [
    "Colegio Santa Catalina (Secundaria)",
    "Universidad Tecnológica Nacional - Facultad Regional Tucumán (Universidad)",
  ];

  return (
    <section id="estudios">
      <div className="titulo">
        <img src="/Educacion.png" alt="Educación" className="icono" />
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