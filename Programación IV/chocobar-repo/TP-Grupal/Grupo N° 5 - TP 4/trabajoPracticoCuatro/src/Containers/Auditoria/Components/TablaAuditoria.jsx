import { Link } from "react-router-dom";
import { useAuditoria } from "../../../hooks/useAuditoria";
import "../../../Styles/TablaAuditoriaStyles.css";
import { REGISTRAR_AUDITORIA } from "../../../routers/auditoria.routes";

const TablaAuditoria = () => {
  const {
    audiorias,
    registroAuditoria,
    modificarAuditoria,
    eliminacionAuditoria,
  } = useAuditoria();

  return (
    <div className="tablaContainer">
          <h2>Auditoría</h2>
          <Link to={REGISTRAR_AUDITORIA} className="botonRegistrarAuditoria">
                Nueva auditoria
            </Link>
      <table className="auditoriaTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Acción</th>
            <th>Fecha</th>
            <th>Hora</th>
          </tr>
        </thead>
        <tbody>
          {audiorias.map((registro) => (
            <tr key={registro.id}>
              <td>{registro.id}</td>
              <td>{registro.usuario}</td>
              <td>{registro.accion}</td>
              <td>{registro.fecha}</td>
              <td>{registro.hora}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaAuditoria;
