import SoftSkills from "./SoftSkills.jsx";
import Certificados from "./Certificados.jsx";

export default function Main() 
{
  return (
    <main>
      <section id="sobre-mi" className="section">
        <div className="container">
          <h2>Sobre mi</h2>
          <p>
            Soy desarrollador Full Stack con perfil emprendedor, ademas soy estudiante de Ingenieria en Sistemas de Informacion y de la Tecnicatura Universitaria en Programacion en la Universidad Tecnologica Nacional (FRT). Me especializo en el desarrollo de aplicaciones web completas, trabajando tanto en el front-end como en el back-end con JavaScript, React, MySQL, C# y .NET, priorizando la eficiencia, la escalabilidad y la calidad del codigo. Tengo conocimientos en ciberseguridad aplicada, lo que me permite implementar buenas practicas de proteccion y gestion segura de la informacion. Tambien me forme en inteligencia artificial generativa y desarrollo con IA, integrando tecnologias actuales al proceso de desarrollo. Como emprendedor, busco crear soluciones tecnologicas que aporten valor real a empresas y usuarios, combinando vision tecnica con enfoque estrategico. Trabajo con metodologias agiles y herramientas como JIRA para una gestion profesional de proyectos. Cuento con nivel B2 de ingles, lo que me permite acceder a documentacion tecnica y colaborar en entornos internacionales.
          </p>
        </div>
      </section>

      <SoftSkills />
      <Certificados />

      <section id="contacto" className="section">
        <div className="container">
          <h2>Contacto</h2>
          <p>Comunicate conmigo:</p>
          <ul className="contact-list">
            <li>
              Email: <a href="mailto:soyunemail@fake.com">soyunemail@fake.com</a>
            </li>
            <li>
              LinkedIn: <a href="https://www.linkedin.com/in/holasoyunlinkedinfake" target="_blank" rel="noopener noreferrer">linkedin.com/in/holasoyunlinkedinfake</a>
            </li>
            <li>
              GitHub: <a href="https://github.com/holasoyungithubfake" target="_blank" rel="noopener noreferrer">github.com/holasoyungithubfake</a>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}

