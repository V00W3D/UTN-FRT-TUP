import React from "react";

/**
 * TableBuilder — Componente genérico de tabla reutilizable.
 * @param {Array} columns - [{ key, label, render? }]
 * @param {Array} data - Datos para las filas
 * @param {Function} renderActions - (row) => JSX (opcional)
 * @param {String} emptyMessage - Texto cuando no hay datos
 */
export function TableBuilder({
  columns = [],
  data = [],
  renderActions,
  emptyMessage = "No hay datos disponibles.",
}) {
  if (!data?.length) return <p className="mt-3 text-muted">{emptyMessage}</p>;

  return (
    <div className="table-container mx-auto" style={{ maxWidth: "800px" }}>
      <table className="table table-hover align-middle">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            {renderActions && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={row.id || i}>
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
              {renderActions && <td>{renderActions(row)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
