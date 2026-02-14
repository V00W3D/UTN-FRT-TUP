import "../CSS/footer.css";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer-section container">
        <div className="footer-content">
          <h2 className="footer-title">Más sobre mí</h2>
          <p className="footer-subtitle">
            Contactame o seguí mis proyectos en las siguientes plataformas:
          </p>

          <div className="footer-icons">
            <a
              href="mailto:v00w3ddev@gmail.com"
              className="footer-icon"
              aria-label="Email"
            >
              <FaEnvelope />
            </a>
            <a
              href="https://github.com/V00W3D"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/victor-leandro-navarro-161372382/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div className="footer-divider"></div>

        <p className="footer-copy">
          © {new Date().getFullYear()} Victor Navarro. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
