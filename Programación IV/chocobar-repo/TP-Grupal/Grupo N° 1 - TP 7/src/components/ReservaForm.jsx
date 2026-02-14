import React, { useState, useEffect } from "react";
import Button from "../components/common/Button";
import "../styles/Reservas.css";

function ReservasForm({ socios = [], actividades = [], onAddReserva, onUpdateReserva, reservaToEdit, onCancelEdit }) {
  const [socio, setSocio] = useState("");
  const [actividad, setActividad] = useState("");
  const [fecha, setFecha] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (reservaToEdit) {
      setSocio(reservaToEdit.socio);
      setActividad(reservaToEdit.actividad);
      setFecha(reservaToEdit.fecha);
    } else {
      setSocio("");
      setActividad("");
      setFecha("");
      setError("");
    }
  }, [reservaToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!socio || !actividad || !fecha) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    setError("");

    const reservaData = { socio, actividad, fecha };

    if (reservaToEdit) {
      onUpdateReserva({ ...reservaToEdit, ...reservaData });
    } else {
      onAddReserva({ id: Date.now(), ...reservaData });
    }

    setSocio("");
    setActividad("");
    setFecha("");
  };

  return (
    <form onSubmit={handleSubmit} className="reservas-form">
      <h3>{reservaToEdit ? "Editar Reserva" : "Nueva Reserva"}</h3>
      {error && <p className="error-message">{error}</p>}
      <select value={socio} onChange={(e) => setSocio(e.target.value)} className="input-field">
        <option value="" disabled>Seleccionar socio</option>
        {socios.map((s) => {
          const label = `${s.nombre} ${s.apellido}`.trim();
          return <option key={s.id} value={label}>{label}</option>;
        })}
      </select>
      <select value={actividad} onChange={(e) => setActividad(e.target.value)} className="input-field">
        <option value="" disabled>Seleccionar actividad</option>
        {actividades.map((a) => (
          <option key={a.id} value={a.nombre}>{a.nombre}</option>
        ))}
      </select>
      <input type="date" className="input-field" value={fecha} onChange={(e) => setFecha(e.target.value)} />
      <div className="form-actions">
        <Button type="submit">{reservaToEdit ? "Actualizar" : "Agregar"}</Button>
        {reservaToEdit && <Button type="button" onClick={onCancelEdit} className="btn-secondary">Cancelar</Button>}
      </div>
    </form>
  );
}

export default ReservasForm;
