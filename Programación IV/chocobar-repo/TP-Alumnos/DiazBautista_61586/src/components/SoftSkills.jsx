import Card from "react-bootstrap/Card";
import {
  FaCheckCircle,
  FaBookOpen,
  FaUsers,
  FaHandsHelping,
  FaCog,
  FaComments,
} from "react-icons/fa";

const SoftSkills = () => {
  const softSkills = [
    {
      softs: "Responsable",
      icono: <FaCheckCircle />,
    },
    {
      softs: "Autodidacta",
      icono: <FaBookOpen />,
    },
    {
      softs: "Trabajo en equipo",
      icono: <FaUsers />,
    },
    {
      softs: "Ayudo a otros",
      icono: <FaHandsHelping />,
    },
    {
      softs: "Dedicado",
      icono: <FaCog />,
    },
    {
      softs: "Comunicación clara",
      icono: <FaComments />,
    },
  ];

  return (
    <div>
      <section id="softskills">
        <h3>SoftSkills</h3>
        <p className="containerCardSoftSkills">
          {softSkills.map((habBlandas,) => (
          <div key={habBlandas} className="cardSoftSkills">
            <Card >
              <Card.Body >
                <Card.Title>{habBlandas.icono}</Card.Title>
                <Card.Subtitle>{habBlandas.softs}</Card.Subtitle>
              </Card.Body>
            </Card>
          </div>
        ))}
        </p>
      </section>
    </div>
  );
};

export default SoftSkills;
