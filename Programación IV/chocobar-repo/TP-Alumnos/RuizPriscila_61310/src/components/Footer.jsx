
import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  const githubUrl = "https://github.com/prii20";
  const linkedinUrl = "https://www.linkedin.com/in/priscila-ruiz-5928a5351";

  return (
    <footer data-aos="fade-up">
      <p>© 2025 - Portfolio - RUIZ PRISCILA NATALI</p>
      <div className="socials">
        <a href={githubUrl} target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
        <a href="mailto:priscilaruiz217@gmail.com">
          <FaEnvelope />
        </a>
      </div>
    </footer>
  );
}