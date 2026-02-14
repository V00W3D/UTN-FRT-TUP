import "../../CSS/estudios.css";

const estudiosData = [
  {
    logo: "/SDLogo.png",
    nombre: "Colegio Santo Domingo",
    nivel: "Primario y Secundario",
    titulo:
      "Técnico en Gestión, Organización y Administración de Pequeñas y Medianas Empresas",
    inicio: "2011",
    fin: "2023",
    orientacion: "Economía",
    duracion: "12 años",
    direccion:
      "Combate de San Lorenzo 816, T4000 San Miguel de Tucumán, Tucumán",
  },
  {
    logo: "/UTNFRTLogo.png",
    nombre: "Universidad Tecnológica Nacional - FRT",
    nivel: "Universitario",
    titulo: "Tecnicatura Universitaria en Programación",
    inicio: "2024",
    fin: "2025",
    estado: "En curso",
    direccion:
      "Bernardino Rivadavia 1050, T4001 San Miguel de Tucumán, Tucumán",
  },
];

const TimelineItem = ({ data, isLast }) => {
  const {
    logo,
    nombre,
    nivel,
    titulo,
    inicio,
    fin,
    orientacion,
    duracion,
    estado,
    direccion,
  } = data;

  return (
    <div className="timeline-item fade-in">
      <div className="timeline-left">
        <div className="edu-coin-wrapper">
          <div className="edu-coin">
            <div className="edu-face edu-front">
              <img src={logo} alt={nombre} />
            </div>
            <div className="edu-face edu-back">
              <img src={logo} alt={`${nombre} reverso`} />
            </div>
          </div>

          <div className="edu-link-wall"></div>
          {!isLast && <div className="edu-link-line"></div>}
        </div>
      </div>

      <div className="timeline-content">
        <h3 className="inst">{nombre}</h3>
        <p className="fecha">
          {inicio} — {fin}
        </p>
        <h4 className="titulo-obtenido">{titulo}</h4>
        <p className="nivel">{nivel}</p>

        {orientacion && <p>Orientación: {orientacion}</p>}
        {estado && <p>Estado: {estado}</p>}
        {duracion && <p>Duración: {duracion}</p>}
        {direccion && <p className="direccion">{direccion}</p>}
      </div>
    </div>
  );
};

const Estudios = () => (
  <section className="estudios-section" id="estudios">
    <h2 className="estudios-title">Formación Académica</h2>

    <div className="timeline">
      {estudiosData.map((data, i) => (
        <TimelineItem
          key={i}
          data={data}
          isLast={i === estudiosData.length - 1}
        />
      ))}
    </div>
  </section>
);

export default Estudios;
