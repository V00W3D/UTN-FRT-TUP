import "../../CSS/idiomas.css";

const idiomas = [
  {
    idioma: "Español (Argentina)",
    nivel: "Nativo",
    imagen: "/ARFlag.png",
  },
  {
    idioma: "Inglés técnico (EE.UU.)",
    nivel: "Intermedio",
    descripcion:
      "Capaz de comprender documentación, código y artículos técnicos en inglés con fluidez. Dificultades mínimas en expresiones coloquiales o informales.",
    imagen: "/USAFlag.png",
  },
];

const Idiomas = () => {
  return (
    <section id="idiomas" className="idiomas-section">
      <h2 className="idiomas-title">Idiomas</h2>

      <div className="idiomas-timeline">
        {idiomas.map((lang, i) => (
          <div key={i} className="idioma-item fadeInIdioma">
            <div className="idioma-left">
              <div className="idioma-flag-wrapper">
                <div className="idioma-flag">
                  <div className="flag-face front">
                    <img src={lang.imagen} alt={lang.idioma} />
                  </div>
                  <div className="flag-face back">
                    <img src={lang.imagen} alt={lang.idioma} />
                  </div>
                </div>
              </div>
              {i !== idiomas.length - 1 && (
                <div className="idioma-link-line"></div>
              )}
            </div>

            <div className="idioma-content">
              <h3 className="idioma-nombre">{lang.idioma}</h3>
              <p className="idioma-nivel">{lang.nivel}</p>
              {lang.descripcion && <p>{lang.descripcion}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Idiomas;
