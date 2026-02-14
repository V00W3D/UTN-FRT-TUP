import { useState, useEffect } from "react";
import ModalBuilder from "../../../../utils/ModalBuilder";
import { useAdminHook } from "../../../../hooks/useAdminHook"; // ← Este hook lo creás según tu lógica (fetch, update, delete, etc.)

export function AdminUsuarioModal({ action, usuario, onClose, show }) {
  const { crearUsuario, editarUsuario, eliminarUsuario } = useAdminHook();

  // Estado inicial según acción
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    rol: "usuario",
    password: "",
  });

  useEffect(() => {
    if (usuario && action === "edit") {
      setForm({
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        password: "",
      });
    } else if (action === "create") {
      setForm({
        nombre: "",
        email: "",
        rol: "usuario",
        password: "",
      });
    }
  }, [usuario, action]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (action === "create") {
        await crearUsuario(form);
        alert("Usuario creado con éxito ✅");
      } else if (action === "edit") {
        await editarUsuario(usuario.id, form);
        alert("Usuario actualizado ✅");
      } else if (action === "delete") {
        await eliminarUsuario(usuario.id);
        alert("Usuario eliminado 🗑️");
      }
      onClose();
    } catch (err) {
      alert(err.message || "Error al procesar la acción");
    }
  };

  // ======== TEXTOS Y CONFIGURACIÓN DINÁMICA =========
  const isDelete = action === "delete";
  const title =
    action === "create"
      ? "Nuevo Usuario"
      : action === "edit"
      ? `Editar Usuario: ${usuario?.nombre ?? ""}`
      : `Eliminar Usuario: ${usuario?.nombre ?? ""}`;

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
            form="adminUsuarioForm"
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
            ¿Seguro que deseas eliminar al usuario{" "}
            <strong>{usuario?.nombre}</strong>?
          </p>
          <p className="text-muted">Esta acción no se puede deshacer.</p>
        </div>
      ) : (
        // =================== CREATE / EDIT ===================
        <form id="adminUsuarioForm" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label>Dirección</label>
            <input
              type="text"
              name="direccion"
              value={form.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label>Contacto</label>
            <input
              type="tel"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {action === "create" && (
            <div className="mb-3">
              <label>Contraseña</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          )}

          {action === "edit" && (
            <div className="mb-3">
              <label>Nueva Contraseña (opcional)</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          )}
        </form>
      )}
    </ModalBuilder>
  );
}
