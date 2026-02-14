import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";

const Header = () => {
  const { user, logout } = useUser();

  return (
    <div className="header">
      <div className="container-bienvenida">
        BIENVENIDO {user ? `${user.nombre} (${user.rol})` : "Invitado"}
      </div>

      <nav className="navbar">
        <ul>
          <li>
            <Link to="/tabla-eventos">Eventos</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboards</Link>
          </li>
          <li>
            <Link to="/tabla-artistas">Artistas</Link>
          </li>
          <li>
            <Link to="/tabla-asistentes">Asistentes</Link>
          </li>
        </ul>
      </nav>

      <div className="btn-logout">
        <Button variant="danger" onClick={logout}>
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
};

export default Header;
