import { useEffect } from "react";
import { useAdminHook } from "../../../hooks/useAdminHook";
import { AdminDonacionesTable } from "./Tables/AdminDonacionesTable";

export default function AdminDonaciones() {
  const { donaciones, fetchDonaciones, loading, error } = useAdminHook();

  useEffect(() => {
    fetchDonaciones();
  }, []);

  return (
    <div className="glass-section">
      <h2>Gestión de Donaciones</h2>
      {loading && <p>Cargando donaciones...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && <AdminDonacionesTable data={donaciones} />}
    </div>
  );
}
