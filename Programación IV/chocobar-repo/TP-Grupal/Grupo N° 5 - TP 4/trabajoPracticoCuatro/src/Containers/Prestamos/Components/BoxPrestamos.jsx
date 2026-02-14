// src/Containers/Prestamos/BoxPrestamos.jsx
import "./../../../Styles/Prestamos.css";

const MOCK = [
  { id: 3, libro: "PRUEBA DE REGISTRO", estudiante: "ESTUDIANTE DE PRUEBA", fechaPrestamo: "2023-04-25", fechaDevolucion: "2023-04-24", cantidad: 10, observacion: "UNA OBSERVACION", estado: "Prestado" },
  { id: 2, libro: "Javascript", estudiante: "Angel Sifuentes", fechaPrestamo: "2021-05-11", fechaDevolucion: "2021-05-11", cantidad: 15, observacion: "", estado: "Devuelto" },
  { id: 1, libro: "poioipoioiop", estudiante: "Angel Sifuentes", fechaPrestamo: "2021-05-11", fechaDevolucion: "2021-05-11", cantidad: 5, observacion: "", estado: "Devuelto" },
];

export default function BoxPrestamos() {
  return (
    <div className="card">
      <div className="toolbar">
        <div className="left"></div>
        <div className="center">
          <button className="icon-btn success" title="Exportar Excel">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M5 20h14v-2H5v2zM11 4v7.17l-2.59-2.58L7 10l5 5 5-5-1.41-1.41L13 11.17V4h-2z"></path>
            </svg>
          </button>
          <button className="icon-btn danger" title="Exportar PDF">PDF</button>
          <button className="icon-btn info" title="Imprimir">🖨️</button>
        </div>
        <div className="right">
          {/* sin buscador por ahora */}
        </div>
      </div>

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Libro</th>
              <th>Estudiante</th>
              <th>Fecha Préstamo</th>
              <th>Fecha Devolución</th>
              <th>Cant</th>
              <th>Observación</th>
              <th>Estado</th>
              <th style={{ width: 120 }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {MOCK.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td className="text-uc">{r.libro}</td>
                <td className="text-uc">{r.estudiante}</td>
                <td>{r.fechaPrestamo}</td>
                <td>{r.fechaDevolucion}</td>
                <td>{r.cantidad}</td>
                <td>{r.observacion || "-"}</td>
                <td>
                  <span className={"badge " + (r.estado === "Devuelto" ? "ok" : "warn")}>
                    {r.estado}
                  </span>
                </td>
                <td>
                  <div className="row-actions">
                    <button className="mini-btn warn" title="Marcar devolución">⏳</button>
                    <button className="mini-btn danger" title="Ver comprobante">📄</button>
                    <button className="mini-btn danger" title="Eliminar">🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}