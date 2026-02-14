import React from "react";


export default function Idiomas() {
  const idiomas = [
    { nombre: "Español", nivel: "Nativo" },
    { nombre: "Inglés", nivel: "Intermedio" }
  ];

  return (
    <section id="idiomas">
      <div className="icono">
        <img src="/Idioma.png" alt="Idiomas" />
      </div>
      <h2>Idiomas</h2>
      <ul>
        {idiomas.map((idioma, index) => (
          <li key={index}>
            {idioma.nombre} - {idioma.nivel}
          </li>
        ))}
      </ul>
    </section>
  );
}