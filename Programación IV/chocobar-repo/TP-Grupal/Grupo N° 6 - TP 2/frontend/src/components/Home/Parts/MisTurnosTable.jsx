// src/pages/Turnos/TurnosTable.jsx
import { useEffect } from "react";
import { TableBuilder } from "../../../common/TableBuilder";
import { useTurnos } from "../../../hooks/useTurnos";
import AuthButton from "../../../common/FormBuilder/AuthButton";

export default function TurnosTable() {
  const {
    turnos,
    isLoading,
    isError,
    errorMessage,
    consultarTurnos,
    cancelarTurno,
  } = useTurnos();

  // 📦 Consultar todos los turnos al montar
  useEffect(() => {
    consultarTurnos();
  }, []);

  // 🧩 Columnas de la tabla
  const columns = [
    { key: "TurnoID", label: "ID" },
    { key: "Fecha", label: "Fecha y hora" },
    { key: "Especialidad", label: "Especialidad" },
    { key: "Profesional", label: "Profesional" },
    { key: "Paciente", label: "Paciente" },
    { key: "Estado", label: "Estado" },
  ];

  // 🗑️ Acción para cancelar turno
  const handleCancelar = async (turno) => {
    const confirm = window.confirm(
      `¿Seguro que deseas cancelar el turno con ${turno.Profesional}?`
    );
    if (!confirm) return;

    const res = await cancelarTurno(turno.TurnoID);
    if (res.ok) alert("✅ Turno cancelado correctamente");
    else alert("❌ " + res.message);
  };

  // ⚙️ Renderizado de acciones
  const renderActions = (turno) => {
    const isCancelado =
      turno.Estado?.toLowerCase() === "cancelado" ||
      turno.Estado?.toLowerCase() === "cancelado por sistema";

    return (
      <AuthButton
        type="button"
        text={isCancelado ? "Cancelado" : "Cancelar"}
        onClick={() => !isCancelado && handleCancelar(turno)}
        disabled={isCancelado || isLoading}
      />
    );
  };

  return (
    <div className="turnos-table-container">
      <h2 className="mb-3">📋 Mis Turnos</h2>

      {isLoading && <p>Cargando turnos...</p>}
      {isError && <p className="text-danger">{errorMessage}</p>}

      <TableBuilder
        columns={columns}
        data={turnos}
        renderActions={renderActions}
        emptyMessage="No tenés turnos registrados."
      />
    </div>
  );
}
