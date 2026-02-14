import React from "react";
import ActividadItem from "./ActividadItem";
import "../styles/ActivadadesList.css";

function ActividadesList({ actividades, onEditActividad, onDeleteActividad }) {
  if (!actividades || actividades.length === 0) {
    return <p>No hay actividades registradas.</p>;
  }

  return (
    <div className="actividades-list-container">
      <h3>Lista de Actividades</h3>
      <ul className="actividades-list">
        {actividades.map((actividad) => (
          <ActividadItem
            key={actividad.id}
            actividad={actividad}
            onEdit={onEditActividad}
            onDelete={onDeleteActividad}
          />
        ))}
      </ul>
    </div>
  );
}

export default ActividadesList;
