import "../CSS/main.css";
import Certificados from "./Main/Certificados";
import Estudios from "./Main/Estudios";
import ExperienciaLaboral from "./Main/ExperienciaLaboral";
import Idiomas from "./Main/Idiomas";
import ProyectosRealizados from "./Main/ProyectosRealizados";
import SobreMi from "./Main/SobreMi";
import SoftSkills from "./Main/SoftSkills";

const Main = () => {
  const sections = [
    { id: "header", label: "Inicio" },
    { id: "sobre-mi", label: "Sobre mí" },
    { id: "estudios", label: "Estudios" },
    { id: "soft-skills", label: "Habilidades blandas" },
    { id: "proyectos", label: "Proyectos" },
    { id: "certificados", label: "Certificados" },
    { id: "idiomas", label: "Idiomas" },
    { id: "experiencia-laboral", label: "Experiencia" },
    { id: "footer", label: "Más..." },
  ];

  return (
    <main id="main" className="main">
      {/* === NAVBAR DE SECCIONES === */}
      <nav className="main-navbar">
        <ul>
          {sections.map((sec) => (
            <li key={sec.id}>
              <a href={`#${sec.id}`}>{sec.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      {/* === SECCIONES DEL PORTFOLIO === */}
      <SobreMi />
      <div className="back-top">
        <a href="#header">↑ Volver arriba</a>
      </div>

      <Estudios />
      <div className="back-top">
        <a href="#header">↑ Volver arriba</a>
      </div>

      <SoftSkills />
      <div className="back-top">
        <a href="#header">↑ Volver arriba</a>
      </div>

      <ProyectosRealizados />
      <div className="back-top">
        <a href="#header">↑ Volver arriba</a>
      </div>

      <Certificados />
      <div className="back-top">
        <a href="#header">↑ Volver arriba</a>
      </div>

      <Idiomas />
      <div className="back-top">
        <a href="#header">↑ Volver arriba</a>
      </div>

      <ExperienciaLaboral />
      <div className="back-top">
        <a href="#header">↑ Volver arriba</a>
      </div>
    </main>
  );
};

export default Main;
