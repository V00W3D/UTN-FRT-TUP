import Estudios from "./Estudios";
import Experiencia from "./Experiencia";
import SoftSkills from "./softSkills";
import Proyectos from "./Proyectos";
import Idiomas from "./Idiomas";
import Certificados from "./Certificados";

const Main = () => {
  return (
    <main className="main-container">
      <div className="main-content">
        <section id="estudios">
          <Estudios />
        </section>
        <section id="experiencia">
          <Experiencia />
        </section>
        <section id="proyectos">
          <Proyectos />
        </section>
        <section id="softskills">
          <SoftSkills />
        </section>
        <section id="idiomas">
          <Idiomas />
        </section>
        <section id="certificados">
          <Certificados />
        </section>
      </div>
    </main>
  );
};

export default Main;
