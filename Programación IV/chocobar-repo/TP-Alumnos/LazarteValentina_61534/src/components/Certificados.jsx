import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";

const certificados = [
  { 
    id: 1, 
    nombre: "Certificado de Inglés UP! Tucumán", 
    link: "/certificado.jpg"
  },
  {
    id: 2, 
    nombre: "Certificado de Titulo Secundario", 
    link: "/titulo%20secundaria.pdf"
  }
];

const Certificados = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="row g-4 justify-content-center">
      {certificados.map((cert, index) => (
        <div
          key={cert.id}
          className="col-12 col-md-6"
          data-aos="flip-left"
          data-aos-delay={index * 150}
        >
          <div
            className="card shadow-sm border-0 h-100"
            style={{
              backgroundColor: "rgba(30,30,47,0.6)",
              color: "#fff",
              borderRadius: "15px",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%"
            }}
          >
            <h5 className="mb-3" style={{ color: "#680f95ff" }}>{cert.nombre}</h5>
            <a 
              href={cert.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-outline-warning"
            >
              Ver Certificado
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Certificados;


