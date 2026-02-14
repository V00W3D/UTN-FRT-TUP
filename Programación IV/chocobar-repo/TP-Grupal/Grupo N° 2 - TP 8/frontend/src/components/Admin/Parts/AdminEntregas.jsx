import { useEffect } from "react";
import { useAdminHook } from "../../../hooks/useAdminHook";
import { AdminEntregasTable } from "./Tables/AdminEntregasTable";

export default function AdminEntregas() {
  const { entregas, fetchEntregas, loading, error } = useAdminHook();

  useEffect(() => {
    fetchEntregas();
  }, []);

  return (
    <div className="glass-section">
      <h2>Gestión de Entregas</h2>
      {loading && <p>Cargando entregas...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && <AdminEntregasTable data={entregas} />}
    </div>
  );
}
