import React from "react";
import Button from "./common/Button";
import "../styles/SocioItem.css";

function SocioItem({ socio, onDelete, onEdit }) {
  const nombre = [socio?.nombre, socio?.apellido].filter(Boolean).join(" ") || "Sin nombre";
  const email = socio?.email || "";
  const rol = socio?.rol || "";
  return (
    <li className="socio-item">
      <span>{nombre} {email && `(${email})`} - Rol: <strong>{rol}</strong></span>
      <div>
        <Button onClick={() => onEdit(socio)} className="btn-secondary">Editar</Button>
        <Button onClick={() => onDelete(socio.id)} className="btn-danger">Eliminar</Button>
      </div>
    </li>
  );
}

export default SocioItem;
