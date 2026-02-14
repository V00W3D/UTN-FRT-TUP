import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="text-white py-4 mt-5"
      style={{
        background: "linear-gradient(135deg, #4b0082, #1c0036)",
      }}
    >
      <div className="container text-center">
        <p className="mb-3">&copy; 2025 Valentina Lazarte</p>

        <div className="mb-3">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white mx-2 fs-4"
          >
            <FaGithub />
          </a>

          <a
            href="https://www.linkedin.com/feed/?trk=guest_homepage-basic_google-one-tap-submit"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white mx-2 fs-4"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=valentinalazarte087@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white mx-2 fs-4"
            title="Enviar correo"
          >
            <FaEnvelope />
          </a>
        </div>

        <a href="#top" className="btn btn-primary">
          Volver arriba
        </a>
      </div>
    </footer>
  );
};

export default Footer;




