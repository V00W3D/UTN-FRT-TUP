// src/pages/Dashboard/Inicio.jsx
import "../../Styles/Dashboard.css";

export default function AdminInicio() {
  return (
    <div className="dashboard-container fade-in">
      <div className="welcome-card">
        <h2 className="welcome-title">¡Bienvenido/a Administrador/a!</h2>

        <p className="welcome-text">
          Usa el <strong>navegador superior</strong> para{" "}
          <strong>Gestionar cada parte del hospital</strong>.
        </p>

        <p className="welcome-subtext">UwU</p>
      </div>
    </div>
  );
}
