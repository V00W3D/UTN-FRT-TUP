import React from "react";
import "../styles/Historial.css";

function Historial({ reservas }) {
  if (reservas.length === 0) {
    return <p className="empty-message">No hay reservas registradas aún.</p>;
  }

  return (
    <div className="historial-container">
      <h2>Historial de Reservas</h2>
      <ul className="historial-list">
        {reservas.map((reserva) => (
          <li key={reserva.id} className="historial-item">
            <span>Socio: {reserva.socio}</span>
            <span>Actividad: {reserva.actividad}</span>
            <span>Fecha: {reserva.fecha}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Historial;
