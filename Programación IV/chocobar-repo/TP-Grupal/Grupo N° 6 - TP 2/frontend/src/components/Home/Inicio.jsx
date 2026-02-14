// src/pages/Dashboard/Inicio.jsx
import "../../Styles/Dashboard.css";

export default function Inicio() {
  return (
    <div className="dashboard-container fade-in">
      <div className="welcome-card">
        <h2 className="welcome-title">¡Bienvenido/a al Panel de Turnos!</h2>

        <p className="welcome-text">
          Usa el <strong>navegador superior</strong> para{" "}
          <strong>solicitar un turno</strong> o
          <strong> ver tus turnos actuales</strong>.
        </p>

        <p className="welcome-subtext">
          Gestioná tus citas médicas de forma rápida, simple y con estilo. Tu
          bienestar comienza con una buena organización
        </p>
      </div>
    </div>
  );
}
