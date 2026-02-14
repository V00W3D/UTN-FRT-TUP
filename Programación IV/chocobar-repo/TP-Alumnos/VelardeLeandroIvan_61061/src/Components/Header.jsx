import ivito from "../Img/ivito.jpg";
const Header = () => (
  <header className="header">
    <img src={ivito} alt="Ivan Velardez" />
    <h1>Leandro Ivan Velardez</h1>
    <h2>Desarrollador Frontend</h2>
    <p>Apasionado por crear experiencias web modernas y funcionales</p>
    <nav className="nav-links">
      <a href="#experiencia">Experiencia</a>
      <a href="#proyectos">Proyectos</a>
      <a href="#estudios">Estudios</a>
      <a href="#certificados">Certificados</a>
      <a href="#softskills">Habilidades</a>
      <a href="#idiomas">Idiomas</a>
    </nav>
  </header>
);

export default Header;
