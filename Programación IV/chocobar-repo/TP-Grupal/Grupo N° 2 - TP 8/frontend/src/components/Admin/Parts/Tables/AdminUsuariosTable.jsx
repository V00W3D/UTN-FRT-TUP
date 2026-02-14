import { useState } from "react";
import ReactDOM from "react-dom";
import { TableBuilder } from "../../../../utils/TableBuilder";
import { AdminUsuarioModal } from "../Modals/AdminUsuariosModal";
export function AdminUsuariosTable({ data }) {
  const [selected, setSelected] = useState(null);
  const [action, setAction] = useState(null); // "create" | "edit" | "delete"

  const columns = [
    { key: "id", label: "ID" },
    { key: "nombre", label: "Nombre" },
    { key: "email", label: "Email" },
    { key: "direccion", label: "Dirección" },
    { key: "telefono", label: "Contacto" },
    { key: "rol", label: "Rol" },
  ];

  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-success btn-sm"
          onClick={() => {
            setSelected(null);
            setAction("create");
          }}
        >
          + Nuevo Usuario
        </button>
      </div>

      <TableBuilder
        columns={columns}
        data={data}
        emptyMessage="No hay usuarios registrados."
        renderActions={(u) => (
          <>
            <button
              className="btn btn-primary btn-sm me-2"
              onClick={() => {
                setSelected(u);
                setAction("edit");
              }}
            >
              Editar
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => {
                setSelected(u);
                setAction("delete");
              }}
            >
              Eliminar
            </button>
          </>
        )}
      />

      {/* 🚪 Lugar donde se montarán los modales (CRUD) */}
      {ReactDOM.createPortal(
        <AdminUsuarioModal
          show={!!action}
          action={action}
          usuario={selected}
          onClose={() => {
            setSelected(null);
            setAction(null);
          }}
        />,
        document.getElementById("portal-root")
      )}
    </>
  );
}
