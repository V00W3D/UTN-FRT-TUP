
import React from "react";
import Button from "../components/common/Button";

function ReservaItem({ reserva, onDelete, onEdit }) {
  return (
    <li className="reserva-item">
      <div className="reserva-info">
        <span><strong>Socio:</strong> {reserva.socio}</span>
        <span><strong>Actividad:</strong> {reserva.actividad}</span>
        <span><strong>Fecha:</strong> {reserva.fecha}</span>
      </div>
      <div className="btn-group">
        <Button onClick={() => onEdit(reserva)} className="btn-secondary">Editar</Button>
        <Button onClick={() => onDelete(reserva.id)} className="btn-danger">Eliminar</Button>
      </div>
    </li>
  );
}

export default ReservaItem;
