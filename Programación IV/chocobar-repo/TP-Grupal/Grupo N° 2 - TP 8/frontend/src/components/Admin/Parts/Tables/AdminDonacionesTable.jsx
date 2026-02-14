import { useState } from "react";
import ReactDOM from "react-dom";
import { TableBuilder } from "../../../../utils/TableBuilder";
import { AdminDonacionModal } from "../Modals/AdminDonacionesModal";
import { select } from "framer-motion/client";

export function AdminDonacionesTable({ data }) {
  const [selected, setSelected] = useState(null);
  const [action, setAction] = useState(null);

  const columns = [
    { key: "id", label: "ID" },
    { key: "donanteId", label: "Usuario" },
    { key: "beneficiario", label: "Beneficiario" },
    { key: "estado", label: "Estado" },
    { key: "descripcion", label: "Producto" },
    { key: "tipo", label: "Tipo" },
    { key: "cantidad", label: "Cantidad" },
    { key: "fecha_donacion", label: "Fecha" },
  ];

  return (
    <>
      <TableBuilder
        columns={columns}
        data={data}
        emptyMessage="No hay donaciones registradas."
        renderActions={(d) => (
          <>
            <button
              className="btn btn-primary btn-sm me-2"
              onClick={() => {
                setSelected(d);
                setAction("aprobar");
              }}
            >
              Aceptar
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => {
                setSelected(d);
                setAction("cancelar");
              }}
            >
              Cancelar
            </button>
          </>
        )}
      />

      {ReactDOM.createPortal(
        <AdminDonacionModal
          show={!!action}
          action={action}
          donacion={selected}
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
