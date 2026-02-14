import "../CSS/header.css";

const Header = () => {
  return (
    <header className="header" id="header">
      <section className="header-section container">
        {/* === BLOQUE EXISTENTE === */}
        <div className="photo-wrapper">
          <div className="coin">
            <div className="face front">
              <img src="/lucoa_w_cat.jpg" alt="Foto de perfil" />
            </div>
            <div className="face back">
              <img src="/foto_trasera.jpg" alt="Reverso de la moneda" />
            </div>
          </div>

          <div className="outline"></div>
          <div className="link-line"></div>
          <div className="link-wall"></div>
        </div>

        <div className="header-content fade-in">
          <h1>Navarro Victor Leandro</h1>
          <h2 className="subtitle">Desarrollador Backend en formación</h2>
          <p className="intro">
            <em>- "Programo, luego existo."</em>
            <br />
            <br />
            Estudiante de la UTN-FRT, apasionado por la lógica, la arquitectura
            del software y el desarrollo backend. Busco construir soluciones
            escalables y eficientes que transformen ideas en sistemas reales.
          </p>
        </div>
      </section>
    </header>
  );
};

export default Header;
