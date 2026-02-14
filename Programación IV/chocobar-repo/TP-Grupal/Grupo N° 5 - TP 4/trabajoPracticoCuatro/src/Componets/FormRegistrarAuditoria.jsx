import { useAdmins } from "../hooks/useAdmins";
import "../Styles/RegistrarAuditoria.css";

const RegistrarAuditoria = () => {
  const { admins, cargando } = useAdmins();

  return (
    <div className="registrarAuditoriaContainer">
      <h2>Registrar Auditoría</h2>

      <form className="registrarAuditoriaForm">
        <label>Usuario:</label>
        {cargando ? (
          <p>Cargando usuarios...</p>
        ) : (
          <select name="usuario" required>
            <option value="">Seleccionar usuario</option>
            {admins.map((admin) => (
              <option key={admin.id} value={admin.nombre}>
                {admin.nombre}
              </option>
            ))}
          </select>
        )}

        <label>Acción:</label>
        <input
          type="text"
          name="accion"
          placeholder="Ej: Eliminó un registro"
          required
        />

        <label>Fecha:</label>
        <input type="date" name="fecha" required />

        <label>Hora:</label>
        <input type="time" name="hora" required />

        <button type="submit" className="registrarBtn">
          Registrar
        </button>
      </form>
    </div>
  );
};

export default RegistrarAuditoria;