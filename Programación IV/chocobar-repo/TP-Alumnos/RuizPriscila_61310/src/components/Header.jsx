
import React, { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Perfil from "../assets/perfil.jpeg";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
  }, [darkMode]);

  const githubUrl = "https://github.com/prii20";
  const linkedinUrl = "https://www.linkedin.com/in/priscila-ruiz-5928a5351";

  return (
    <header className="header" id="inicio">
      <div className="header-content" data-aos="fade-down">
        <img src={Perfil} alt="Foto de Priscila Ruiz" className="profile-photo" />

        <h1>
          <TypeAnimation
            sequence={[
              "Ruiz Priscila",
              2000,
              "FULL STACK",
              2000,
              "Apasionada por el diseño moderno",
              2000,
              "y la experiencia de usuario",
              2000,
            ]}
            speed={60}
            repeat={Infinity}
          />
        </h1>

        <nav>
          <ul className="nav-links">
            <li><a href="#estudios">Estudios</a></li>
            <li><a href="#softskills">Soft Skills</a></li>
            <li><a href="#proyectos">Proyectos</a></li>
            <li><a href="#idiomas">Idiomas</a></li>
            <li><a href="#certificados">Certificados</a></li>
          </ul>
        </nav>

        <div className="socials">
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
        </div>

        <button
          className="dark-mode-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "🌞 Modo Claro" : "🌙 Modo Oscuro"}
        </button>
      </div>
    </header>
  );
};

export default Header;


