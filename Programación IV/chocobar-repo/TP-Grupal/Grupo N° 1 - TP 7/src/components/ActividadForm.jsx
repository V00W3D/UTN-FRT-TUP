import React, { useState, useEffect } from "react";
import Button from "./common/Button";
import "../styles/ActividadForm.css";

function ActividadForm({ onAddActividad, onUpdateActividad, actividadToEdit, onCancelEdit }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (actividadToEdit) {
      setNombre(actividadToEdit.nombre);
      setDescripcion(actividadToEdit.descripcion);
    } else {
      setNombre("");
      setDescripcion("");
      setError("");
    }
  }, [actividadToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim() || !descripcion.trim()) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    setError("");
    const actividadData = { nombre, descripcion };
    if (actividadToEdit) {
      onUpdateActividad({ ...actividadToEdit, ...actividadData });
    } else {
      onAddActividad({ id: Date.now(), ...actividadData });
    }
    setNombre("");
    setDescripcion("");
  };

  return (
    <form className="actividad-form-container" onSubmit={handleSubmit}>
      <h3>{actividadToEdit ? "Editar Actividad" : "Registrar Nueva Actividad"}</h3>
      {error && <p className="error-message">{error}</p>}
      <div className="input-group">
        <label htmlFor="nombre">Nombre:</label>
        <input
          id="nombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="input-field"
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="descripcion">Descripción:</label>
        <textarea
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="input-field"
          required
        />
      </div>
      <div className="form-actions">
        <Button type="submit">{actividadToEdit ? "Actualizar" : "Agregar"}</Button>
        {actividadToEdit && <Button type="button" onClick={onCancelEdit} className="btn-secondary">Cancelar</Button>}
      </div>
    </form>
  );
}

export default ActividadForm;
