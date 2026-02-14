import { CiLinkedin } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">
      <h4>Redes</h4>
      <div className="footerLinks">
        <a href="https://https://www.linkedin.com/in/bautista-d%C3%ADaz-743613373/" target="_blank">
          <CiLinkedin />
        </a>
        <a href="https://github.com/bautista-diaz-06" target="_blank">
          <FaGithub />
        </a>
      </div>
    </div>
  );
};

export default Footer;
