import { useState } from "react";
import ReactDOM from "react-dom";
import { TableBuilder } from "../../../../utils/TableBuilder";
import { AdminEntregaModal } from "../Modals/AdminEntregasModal";

export function AdminEntregasTable({ data }) {
  const [selected, setSelected] = useState(null);
  const [action, setAction] = useState(null);

  const columns = [
    { key: "id", label: "ID" },
    { key: "donacionId", label: "Donación" },
    { key: "beneficiarioId", label: "Beneficiario" },
    { key: "responsableId", label: "Donante" },
    { key: "fecha_entrega", label: "Fecha de Entrega" },
    { key: "confirmada", label: "Recibida" },
    { key: "cantidad_entregada", label: "Cantidad del bien donado" },
  ];

  return (
    <>
      <TableBuilder
        columns={columns}
        data={data}
        emptyMessage="No hay entregas registradas."
        renderActions={(e) => (
          <>
            <button
              className="btn btn-primary btn-sm me-2"
              onClick={() => {
                setSelected(e);
                setAction("aprobar");
              }}
            >
              Confirmar Entrega
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => {
                setSelected(e);
                setAction("cancelar");
              }}
            >
              Cancelar entrega
            </button>
          </>
        )}
      />

      {ReactDOM.createPortal(
        <AdminEntregaModal
          show={!!action}
          action={action}
          entrega={selected}
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
