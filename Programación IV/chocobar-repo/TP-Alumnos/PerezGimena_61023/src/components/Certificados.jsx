import React from "react";

export default function Certificados() {
  const certificados = [
    { nombre: "Secretariado Informático", tipo: "pdf", src: "/INI.pdf" },
    { nombre: "Introducción a la Programación", tipo: "pdf", src: "/Certificado-Introducción-a-la-Programación-EducaciónIT.pdf" },
    { nombre: "Digitalers Front End Developer", tipo: "enCurso" }
  ];

  return (
    <section id="certificados">
      <div className="titulo">
        <img src="/certificado.png" alt="Certificados" className="icono" />
        <h2>Certificados</h2>
      </div>
      <ul>
        {certificados.map((cert, index) => (
          <li key={index} className="cert-item">
            <strong>{cert.nombre}</strong>
            {cert.tipo === "pdf" && (
              <a href={cert.src} target="_blank" rel="noopener noreferrer" className="cert-link">
                 Ver PDF
              </a>
            )}
            {cert.tipo === "enCurso" && <span className="en-curso"> En curso</span>}
          </li>
        ))}
      </ul>
    </section>
  );
}