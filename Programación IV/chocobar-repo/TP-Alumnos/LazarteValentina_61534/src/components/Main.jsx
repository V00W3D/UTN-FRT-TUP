import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Experiencia from "./Experiencia.jsx";
import Estudios from "./Estudios.jsx";
import Idiomas from "./Idiomas.jsx";
import Certificados from "./Certificados.jsx";
import SoftSkills from "./SoftSkills.jsx";
import Proyectos from "./Proyectos.jsx";

const Main = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const sectionStyle = {
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: "2rem",
    borderRadius: "15px",
    marginBottom: "2rem",
  };

  return (
    <main
      style={{
        background: "linear-gradient(135deg, #2a002f, #0d0015)",
        minHeight: "100vh",
        color: "#fff",
        padding: "3rem 1rem",
      }}
    >
      <h1 className="text-center mb-5" data-aos="fade-down" style={{ color: "#d1c4e9", textShadow: "1px 1px 3px rgba(0,0,0,0.6)" }}>
        Mi Portfolio 💻
      </h1>

      <div className="row g-5">
        {/* Experiencia */}
        <section className="col-12" data-aos="fade-up">
          <div style={sectionStyle}>
            <h2 className="text-center mb-4" style={{ color: "#d1c4e9" }}>Experiencia</h2>
            <Experiencia />
          </div>
        </section>

        {/* Estudios e Idiomas lado a lado */}
        <section className="col-12 col-md-6" data-aos="fade-up">
          <div style={sectionStyle}>
            <h2 className="text-center mb-4" style={{ color: "#d1c4e9" }}>Estudios</h2>
            <Estudios />
          </div>
        </section>
        <section className="col-12 col-md-6" data-aos="fade-up">
          <div style={sectionStyle}>
            <h2 className="text-center mb-4" style={{ color: "#d1c4e9" }}>Idiomas</h2>
            <Idiomas />
          </div>
        </section>

        {/* Certificados y Soft Skills */}
        <section className="col-12 col-md-6" data-aos="fade-up">
          <div style={sectionStyle}>
            <h2 className="text-center mb-4" style={{ color: "#d1c4e9" }}>Certificados</h2>
            <Certificados />
          </div>
        </section>
        <section className="col-12 col-md-6" data-aos="fade-up">
          <div style={sectionStyle}>
            <h2 className="text-center mb-4" style={{ color: "#d1c4e9" }}>Soft Skills</h2>
            <SoftSkills />
          </div>
        </section>

        {/* Proyectos */}
        <section className="col-12" data-aos="fade-up">
          <div style={sectionStyle}>
            <h2 className="text-center mb-4" style={{ color: "#d1c4e9" }}>Proyectos</h2>
            <Proyectos />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Main;
