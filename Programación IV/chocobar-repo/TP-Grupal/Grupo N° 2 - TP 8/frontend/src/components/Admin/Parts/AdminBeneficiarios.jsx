import { useEffect } from "react";
import { useAdminHook } from "../../../hooks/useAdminHook";
import { AdminBeneficiariosTable } from "./Tables/AdminBeneficiariosTable";

const AdminBeneficiarios = () => {
  const { beneficiarios, fetchBeneficiarios, loading, error } = useAdminHook();

  useEffect(() => {
    fetchBeneficiarios();
  }, []);

  return (
    <div className="glass-section">
      <h2>Gestión de Beneficiarios</h2>
      {loading && <p>Cargando beneficiarios...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && <AdminBeneficiariosTable data={beneficiarios} />}
    </div>
  );
};
export default AdminBeneficiarios;
