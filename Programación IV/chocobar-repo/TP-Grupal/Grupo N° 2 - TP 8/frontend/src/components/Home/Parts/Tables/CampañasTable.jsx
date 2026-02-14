import { useState } from "react";
import ReactDOM from "react-dom";
import { TableBuilder } from "../../../../utils/TableBuilder";
import { DonarModal } from "../Modals/DonarModal";

export function CampañasTable({ data }) {
  const [selected, setSelected] = useState(null);

  const columns = [
    { key: "nombre", label: "Nombre" },
    { key: "direccion", label: "Dirección" },
    { key: "contacto", label: "Contacto" },
  ];

  return (
    <>
      <TableBuilder
        columns={columns}
        data={data}
        emptyMessage="No hay campañas disponibles."
        renderActions={(b) => (
          <button
            className="btn btn-success btn-sm"
            onClick={() => setSelected(b)}
          >
            Donar
          </button>
        )}
      />

      {ReactDOM.createPortal(
        <DonarModal
          show={!!selected}
          beneficiario={selected}
          onClose={() => setSelected(null)}
        />,
        document.getElementById("portal-root")
      )}
    </>
  );
}
