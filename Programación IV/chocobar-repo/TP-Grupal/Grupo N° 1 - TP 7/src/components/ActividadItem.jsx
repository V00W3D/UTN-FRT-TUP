import React from "react";
import Button from "./common/Button";
import "../styles/ActividadItem.css";

function ActividadItem({ actividad, onEdit, onDelete }) {
  const nombre = actividad?.nombre || "Actividad sin nombre";
  const descripcion = actividad?.descripcion || "";
  return (
    <li className="actividad-item">
      <span>{nombre}{descripcion ? `: ${descripcion}` : ""}</span>
      <div>
        <Button onClick={() => onEdit(actividad)} className="btn-secondary">Editar</Button>
        <Button onClick={() => onDelete(actividad.id)} className="btn-danger">Eliminar</Button>
      </div>
    </li>
  );
}

export default ActividadItem;
