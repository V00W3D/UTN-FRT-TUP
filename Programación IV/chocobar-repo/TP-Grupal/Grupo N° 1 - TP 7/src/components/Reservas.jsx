import React, { useState } from "react";
import ReservaForm from "./ReservaForm";
import ReservasList from "./ReservasList";

function Reservas({ socios, actividades, reservas, setReservas, onAdd, onUpdate, onDelete }) {
  const [reservaToEdit, setReservaToEdit] = useState(null);

  const addReserva = newReserva => {
    if (onAdd) return onAdd(newReserva);
    setReservas([...reservas, newReserva]);
  };
  const updateReserva = updatedReserva => {
    if (onUpdate) return onUpdate(updatedReserva);
    setReservas(reservas.map(r => (r.id === updatedReserva.id ? updatedReserva : r)));
    setReservaToEdit(null);
  };
  const deleteReserva = id => {
    if (onDelete) return onDelete(id);
    setReservas(reservas.filter(r => r.id !== id));
  };
  const handleEdit = reserva => setReservaToEdit(reserva);
  const handleCancelEdit = () => setReservaToEdit(null);

  return (
    <div className="page-container">
      <h2>Gestión de Reservas</h2>
      <ReservaForm
        socios={socios}
        actividades={actividades}
        reservas={reservas}
        onAddReserva={addReserva}
        onUpdateReserva={updateReserva}
        reservaToEdit={reservaToEdit}
        onCancelEdit={handleCancelEdit}
      />
      <ReservasList
        reservas={reservas}
        socios={socios}
        actividades={actividades}
        onEditReserva={handleEdit}
        onDeleteReserva={deleteReserva}
      />
    </div>
  );
}

export default Reservas;
