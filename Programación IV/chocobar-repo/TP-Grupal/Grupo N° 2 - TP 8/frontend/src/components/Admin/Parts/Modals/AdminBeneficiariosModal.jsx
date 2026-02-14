import { useState, useEffect } from "react";
import ModalBuilder from "../../../../utils/ModalBuilder";
import { useAdminHook } from "../../../../hooks/useAdminHook";

export function AdminBeneficiarioModal({
  action,
  beneficiario,
  onClose,
  show,
}) {
  const { crearBeneficiario, editarBeneficiario, eliminarBeneficiario } =
    useAdminHook();

  // Estado inicial según acción
  const [form, setForm] = useState({
    nombre: "",
    direccion: "",
    contacto: "",
  });

  useEffect(() => {
    if (beneficiario && action === "edit") {
      setForm({
        nombre: beneficiario.nombre || "",
        direccion: beneficiario.direccion || "",
        contacto: beneficiario.contacto || "",
      });
    } else if (action === "create") {
      setForm({
        nombre: "",
        direccion: "",
        contacto: "",
      });
    }
  }, [beneficiario, action]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (action === "create") {
        await crearBeneficiario(form);
        alert("Beneficiario agregado con éxito ✅");
      } else if (action === "edit") {
        await editarBeneficiario(beneficiario.id, form);
        alert("Beneficiario actualizado ✅");
      } else if (action === "delete") {
        await eliminarBeneficiario(beneficiario.id);
        alert("Beneficiario eliminado 🗑️");
      }
      onClose();
    } catch (err) {
      alert(err.message || "Error al procesar la acción");
    }
  };

  // ======== CONFIGURACIÓN DINÁMICA =========
  const isDelete = action === "delete";
  const title =
    action === "create"
      ? "Nuevo Beneficiario"
      : action === "edit"
      ? `Editar Beneficiario: ${beneficiario?.nombre ?? ""}`
      : `Eliminar Beneficiario: ${beneficiario?.nombre ?? ""}`;

  const actionLabel =
    action === "create"
      ? "Crear"
      : action === "edit"
      ? "Guardar cambios"
      : "Eliminar";

  return (
    <ModalBuilder
      show={show}
      title={title}
      onClose={onClose}
      actions={
        <>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button
            className={`btn ${isDelete ? "btn-danger" : "btn-primary"}`}
            type="submit"
            form="adminBeneficiarioForm"
          >
            {actionLabel}
          </button>
        </>
      }
    >
      {/* =================== DELETE =================== */}
      {isDelete ? (
        <div className="text-center py-3">
          <p>
            ¿Seguro que deseas eliminar al beneficiario{" "}
            <strong>{beneficiario?.nombre}</strong>?
          </p>
          <p className="text-muted">Esta acción no se puede deshacer.</p>
        </div>
      ) : (
        // =================== CREATE / EDIT ===================
        <form id="adminBeneficiarioForm" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Nombre del Beneficiario</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className="form-control"
              placeholder="Ej: Comedor San José"
              required
            />
          </div>

          <div className="mb-3">
            <label>Dirección</label>
            <input
              type="text"
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
              className="form-control"
              placeholder="Ej: Av. Belgrano 1550, Buenos Aires"
              required
            />
          </div>

          <div className="mb-3">
            <label>Contacto</label>
            <input
              type="tel"
              name="contacto"
              value={form.contacto}
              onChange={handleChange}
              className="form-control"
              placeholder="Ej: 1134567890"
              required
            />
          </div>
        </form>
      )}
    </ModalBuilder>
  );
}
