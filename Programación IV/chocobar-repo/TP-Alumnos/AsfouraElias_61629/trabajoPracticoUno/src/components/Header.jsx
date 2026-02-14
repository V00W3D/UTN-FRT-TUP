import "../styles/Header.css"

const Header = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="header">
      <nav className="nav">
        <button onClick={() => scrollToSection("experiencia")}>Experiencia</button>
        <button onClick={() => scrollToSection("proyectos")}>Proyectos</button>
        <button onClick={() => scrollToSection("estudios")}>Estudios</button>
        <button onClick={() => scrollToSection("idiomas")}>Idiomas</button>
        <button onClick={() => scrollToSection("softskills")}>Soft Skills</button>
      </nav>
    </header>
  );
};

export default Header;