import React, { useEffect } from "react";
import { ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";

const idiomas = [
  { id: 1, nombre: "Inglés", nivel: 70 },
  { id: 2, nombre: "Español", nivel: 100 },
];

const Idiomas = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const cardStyle = {
    background: "linear-gradient(135deg, #4b0082, #1c0036)",
    borderRadius: "15px",
    padding: "1rem",
    color: "#fff",
    cursor: "default",
    minHeight: "250px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    transition: "transform 0.3s",
  };

  const cardHover = {
    transform: "translateY(-5px)",
  };

  return (
    <div className="row g-4">
      {idiomas.map((idioma, index) => (
        <div
          key={idioma.id}
          className="col-12 col-md-6"
          data-aos="fade-up"
          data-aos-delay={index * 150}
        >
          <div
            className="card shadow-sm h-100"
            style={cardStyle}
            onMouseEnter={e => e.currentTarget.style.transform = cardHover.transform}
            onMouseLeave={e => e.currentTarget.style.transform = "none"}
          >
            <h5 style={{ fontWeight: "bold", marginBottom: "1rem", color: "#a350d6ff", textAlign: "center" }}>
              {idioma.nombre}
            </h5>
            <ProgressBar
              now={idioma.nivel}
              label={`${idioma.nivel}%`}
              animated
              striped
              style={{
                height: "1.4rem", // más compacta
                fontWeight: "bold",
                backgroundColor: "#333",
                "--bs-progress-bg": "#9fa8da", // barra morada
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Idiomas;
