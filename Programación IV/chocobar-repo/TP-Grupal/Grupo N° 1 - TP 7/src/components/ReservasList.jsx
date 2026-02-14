import React from "react";
import ReservaItem from "./ReservaItem";

function ReservasList({ reservas, onDeleteReserva, onEditReserva }) {
  if (!reservas || reservas.length === 0) return <p>No hay reservas registradas.</p>;

  return (
    <div className="reservas-list-container">
      <h3>Lista de Reservas</h3>
      <ul className="reservas-list">
        {reservas.map((reserva) => (
          <ReservaItem
            key={reserva.id}
            reserva={reserva}
            onDelete={onDeleteReserva}
            onEdit={onEditReserva}
          />
        ))}
      </ul>
    </div>
  );
}

export default ReservasList;
