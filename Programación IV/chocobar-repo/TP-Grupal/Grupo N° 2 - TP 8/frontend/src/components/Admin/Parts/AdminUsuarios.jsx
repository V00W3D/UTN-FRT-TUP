import { useEffect } from "react";
import { useAdminHook } from "../../../hooks/useAdminHook";
import { AdminUsuariosTable } from "./Tables/AdminUsuariosTable";

export default function AdminUsuarios() {
  const { usuarios, fetchUsuarios, loading, error } = useAdminHook();

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <div className="glass-section">
      <h2>Gestión de Usuarios</h2>
      {loading && <p>Cargando usuarios...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && <AdminUsuariosTable data={usuarios} />}
    </div>
  );
}
