import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";

const softskills = [
  { id: 1, nombre: "Trabajo en equipo" },
  { id: 2, nombre: "Comunicación" },
  { id: 3, nombre: "Resolución de problemas" },
  { id: 4, nombre: "Creatividad" },
];

const SoftSkills = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="row g-4 justify-content-center">
      {softskills.map((skill, index) => (
        <div
          key={skill.id}
          className="col-6 col-md-3"
          data-aos="zoom-in"
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
              height: "100%",
              transition: "transform 0.3s",
              cursor: "pointer"
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-5px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "none"}
          >
            <span style={{ fontWeight: 600, fontSize: "1.1rem" }}>{skill.nombre}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SoftSkills;
