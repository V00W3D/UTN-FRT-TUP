import { TableBuilder } from "../../../../utils/TableBuilder";

/**
 * 📊 Tabla de historial de donaciones
 * Muestra: producto, tipo, cantidad, fecha, y beneficiario
 */
export function HistorialTable({ data }) {
  const columns = [
    { key: "producto", label: "Producto" },
    { key: "tipo", label: "Tipo" },
    { key: "cantidad", label: "Cantidad" },
    {
      key: "fecha",
      label: "Fecha",
      render: (value) =>
        new Date(value).toLocaleDateString("es-AR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
    },
    {
      key: "beneficiario",
      label: "Beneficiario",
      render: (_, row) => row.beneficiario?.nombre || "—",
    },
  ];

  return (
    <TableBuilder
      columns={columns}
      data={data}
      emptyMessage="No registras donaciones todavía."
    />
  );
}
