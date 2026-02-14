import { useState } from "react";
import ReactDOM from "react-dom";
import { TableBuilder } from "../../../../utils/TableBuilder";
import { AdminBeneficiarioModal } from "../Modals/AdminBeneficiariosModal";
export function AdminBeneficiariosTable({ data }) {
  const [selected, setSelected] = useState(null);
  const [action, setAction] = useState(null);

  const columns = [
    { key: "id", label: "ID" },
    { key: "nombre", label: "Nombre" },
    { key: "direccion", label: "Dirección" },
    { key: "contacto", label: "Contacto" },
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
          + Nuevo Beneficiario
        </button>
      </div>

      <TableBuilder
        columns={columns}
        data={data}
        emptyMessage="No hay beneficiarios registrados."
        renderActions={(b) => (
          <>
            <button
              className="btn btn-primary btn-sm me-2"
              onClick={() => {
                setSelected(b);
                setAction("edit");
              }}
            >
              Editar
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => {
                setSelected(b);
                setAction("delete");
              }}
            >
              Eliminar
            </button>
          </>
        )}
      />

      {ReactDOM.createPortal(
        <AdminBeneficiarioModal
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
