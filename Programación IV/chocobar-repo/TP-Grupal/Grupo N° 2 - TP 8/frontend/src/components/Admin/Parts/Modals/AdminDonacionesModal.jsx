// src/components/Admin/Parts/Modals/AdminDonacionModal.jsx
import { useState } from "react";
import ModalBuilder from "../../../../utils/ModalBuilder";
import { useAdminHook } from "../../../../hooks/useAdminHook";

export function AdminDonacionModal({ action, donacion, onClose, show }) {
  const { aprobarDonacion, cancelarDonacion, beneficiarios, usuarios } =
    useAdminHook();

  const [form, setForm] = useState({
    beneficiarioId: "",
    responsableId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (action === "aprobar") {
        if (!form.beneficiarioId || !form.responsableId)
          return alert("Selecciona un beneficiario y responsable.");
        await aprobarDonacion(
          donacion.id,
          form.beneficiarioId,
          form.responsableId
        );
        alert("Donación aprobada y entrega registrada ✅");
      } else if (action === "cancelar") {
        await cancelarDonacion(donacion.id);
        alert("Donación cancelada ❌");
      }
      onClose();
    } catch (err) {
      alert(err.message || "Error al procesar la acción");
    }
  };

  const isCancel = action === "cancelar";
  const title = isCancel
    ? `Cancelar Donación: ${donacion?.descripcion}`
    : `Aprobar Donación: ${donacion?.descripcion}`;
  const actionLabel = isCancel
    ? "Cancelar Donación"
    : "Aprobar y Registrar Entrega";

  return (
    <ModalBuilder
      show={show}
      title={title}
      onClose={onClose}
      actions={
        <>
          <button className="btn btn-secondary" onClick={onClose}>
            Cerrar
          </button>
          <button
            className={`btn ${isCancel ? "btn-danger" : "btn-success"}`}
            type="submit"
            form="adminDonacionForm"
          >
            {actionLabel}
          </button>
        </>
      }
    >
      {isCancel ? (
        <div className="text-center py-3">
          <p>
            ¿Seguro que deseas cancelar la donación{" "}
            <strong>{donacion?.descripcion}</strong>?
          </p>
          <p className="text-muted">Esta acción no se puede deshacer.</p>
        </div>
      ) : (
        <form id="adminDonacionForm" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Seleccionar Beneficiario</label>
            <select
              name="beneficiarioId"
              value={form.beneficiarioId}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">-- Seleccionar --</option>
              {beneficiarios.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label>Responsable</label>
            <select
              name="responsableId"
              value={form.responsableId}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">-- Seleccionar --</option>
              {usuarios
                .filter((u) => u.rol === "admin" || u.rol === "colaborador")
                .map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.nombre}
                  </option>
                ))}
            </select>
          </div>
        </form>
      )}
    </ModalBuilder>
  );
}
