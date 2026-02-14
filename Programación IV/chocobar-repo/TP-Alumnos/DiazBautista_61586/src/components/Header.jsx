const Header = () => {
  return (
    <div>
      <header className="headerContainer">
        <nav className="navBarcito">
          <a href="#estudios">ESTUDIOS</a>
          <a href="#softskills">SOFT SKILLS</a>
          <a href="#proyectos">PROYECTOS</a>
          <a href="#idiomas">IDIOMAS</a>
        </nav>

        <div className="headerContent">
          <div className="containerImagen">
            <img src="fotopersonal.png" alt="" className="imagenPersonal" />
          </div>
          <div className="containerNombre">
            <h1 className="nombre">Bautista Díaz</h1>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
