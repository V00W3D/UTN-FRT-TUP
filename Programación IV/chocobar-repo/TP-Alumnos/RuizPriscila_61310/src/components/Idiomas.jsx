import React from 'react';
import { FaGlobe } from "react-icons/fa";

function Idiomas() {
  const idiomas = [
    { id: 1, nombre: "Español", nivel: "Nativo" },
    { id: 2, nombre: "Inglés", nivel: "Intermedio" }
  ];

  return (
    <section id="idiomas">
      <h2><FaGlobe /> Idiomas</h2>
      <ul>
        {idiomas.map((idioma) => (
          <li key={idioma.id}>
            {idioma.nombre} - {idioma.nivel}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Idiomas;
