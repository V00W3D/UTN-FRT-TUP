import "../../CSS/sobremi.css";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaNpm,
  FaGitAlt,
  FaGithub,
  FaDatabase,
  FaCodeBranch,
  FaTrello,
  FaCogs,
} from "react-icons/fa";
import {
  SiTypescript,
  SiExpress,
  SiTrpc,
  SiGraphql,
  SiJsonwebtokens,
  SiMysql,
  SiMongodb,
  SiZod,
  SiJirasoftware,
  SiVite,
} from "react-icons/si";
import { useState } from "react";

const datosPersonales = {
  nombre: "Navarro Victor Leandro",
  edad: 18,
};

/* ===============================
   CATEGORÍAS UNIFICADAS
================================ */

// 💻 Lenguajes de programación
const lenguajes = [
  { name: "JavaScript (JSX)", icon: FaJs, className: "js" },
  { name: "TypeScript (TSX)", icon: SiTypescript, className: "ts" },
];

// 🎨 Frontend
const frontendSkills = [
  { name: "HTML", icon: FaHtml5, className: "html" },
  { name: "CSS", icon: FaCss3Alt, className: "css" },
  { name: "React", icon: FaReact, className: "react" },
  { name: "Vite", icon: SiVite, className: "vite" },
];

// ⚙️ Backend
const backendSkills = [
  { name: "Node.js", icon: FaNodeJs, className: "node" },
  { name: "Express", icon: SiExpress, className: "express" },
  { name: "tRPC (RPC/REST/GraphQL)", icon: SiTrpc, className: "trpc" },
  { name: "GraphQL", icon: SiGraphql, className: "graphql" },
  { name: "JWT (Auth)", icon: SiJsonwebtokens, className: "jwt" },
  { name: "Crypto / Seguridad", icon: FaCogs, className: "crypto" },
  { name: "Zod (Schemas)", icon: SiZod, className: "zod" },
  { name: "Mongoose", icon: FaDatabase, className: "mongoose" },
];

// 🗄️ Bases de datos
const basesDeDatos = [
  { name: "MySQL", icon: SiMysql, className: "mysql" },
  { name: "MongoDB", icon: SiMongodb, className: "mongo" },
];

// 🧰 Herramientas de desarrollo
const herramientas = [
  { name: "npm / npx", icon: FaNpm, className: "npm" },
  { name: "Git", icon: FaGitAlt, className: "git" },
  { name: "GitHub", icon: FaGithub, className: "github" },
];

// 🗂️ Gestión y organización
const gestion = [
  { name: "Trello", icon: FaTrello, className: "trello" },
  { name: "Jira", icon: SiJirasoftware, className: "jira" },
  { name: "SCRUM / Project Mgmt", icon: FaCodeBranch, className: "scrum" },
];

/* ===============================
   COMPONENTE PRINCIPAL
================================ */
const SobreMi = () => {
  const [fallbackIcon] = useState("🔧");

  const SafeIcon = ({ Icon, className }) => {
    try {
      if (!Icon) throw new Error("Icon not found");
      return <Icon className={`skill-icon ${className}`} />;
    } catch {
      return (
        <span
          className={`skill-icon ${className}`}
          role="img"
          aria-label="icon"
        >
          {fallbackIcon}
        </span>
      );
    }
  };

  const renderSkills = (titulo, skills) => (
    <div className="skills-category">
      <h4>{titulo}</h4>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div className="skill-item" key={index}>
            <SafeIcon Icon={skill.icon} className={skill.className} />
            <span>{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="sobre-mi" className="sobre-mi-section container">
      {/* === Contenido textual === */}
      <div className="sobre-mi-content fade-in">
        <h2 className="sobre-mi-title">Sobre mí</h2>
        <p>
          Soy <strong>{datosPersonales.nombre}</strong>, estudiante de la
          Tecnicatura Universitaria en Programación en la UTN-FRT. Tengo{" "}
          {datosPersonales.edad} años y me apasiona el desarrollo backend,
          especialmente la creación de sistemas sólidos, seguros y escalables.
        </p>
        <p>
          Disfruto enfrentar desafíos lógicos, aprender nuevas tecnologías y
          mejorar continuamente mis habilidades. Mi enfoque está en el
          desarrollo backend, pero también tengo una base sólida en frontend y
          experiencia con metodologías ágiles.
        </p>
      </div>

      {/* === Sección de habilidades === */}
      <div className="skills-section fade-in">
        <h3>Lenguajes y herramientas que manejo</h3>
        <p className="skills-desc">
          Experiencia en desarrollo <strong>Frontend</strong> (React con
          JSX/TSX) y enfoque profesional en <strong>Backend</strong> con
          Node.js, Express, tRPC y bases de datos relacionales/noSQL. Manejo
          herramientas de control de versiones, validación, gestión de proyectos
          y entornos colaborativos.
        </p>

        {renderSkills("Lenguajes de Programación", lenguajes)}
        {renderSkills("Frontend", frontendSkills)}
        {renderSkills("Backend", backendSkills)}
        {renderSkills("Bases de Datos", basesDeDatos)}
        {renderSkills("Herramientas de Desarrollo", herramientas)}
        {renderSkills("Gestión y Organización", gestion)}
      </div>
    </section>
  );
};

export default SobreMi;
