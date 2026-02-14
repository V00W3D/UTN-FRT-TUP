import React from "react";
import SocioItem from "./SocioItem";
import "../styles/SociosList.css";

function SociosList({ socios, onDeleteSocio, onEditSocio }) {
  if (!socios || socios.length === 0) {
    return <p>No hay socios registrados.</p>;
  }

  return (
    <div className="socios-list-container">
      <h3>Lista de Socios</h3>
      <ul className="socios-list">
        {socios.map((socio) => (
          <SocioItem
            key={socio.id}
            socio={socio}
            onDelete={onDeleteSocio}
            onEdit={onEditSocio}
          />
        ))}
      </ul>
    </div>
  );
}

export default SociosList;
