import React from "react";
import Estudios from "./Estudios";
import SoftSkills from "./SoftSkills";
import Proyectos from "./Proyectos";
import Experiencia from "./Experiencia";
import Idiomas from "./Idiomas";
import Certificados from "./Certificados";
import "../styles/Sections.css"; // Importa el CSS común para mantener consistencia

export default function Main() {
  return (
    <main className="p-5">
      {/* Presentación personal como tarjeta */}
      <section className="section">
        <h2>Sobre mí</h2>
        <p>
          Hola, soy Camila Almiron, desarrolladora en formación. Me apasiona la programación y
          crear aplicaciones web modernas y funcionales.
        </p>
      </section>

      {/* Secciones del portfolio */}
      <Estudios />
      <SoftSkills />
      <Proyectos />
      <Experiencia />
      <Idiomas />
      <Certificados />
    </main>
  );
}
