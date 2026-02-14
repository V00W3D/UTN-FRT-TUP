import { useEffect } from "react";
import { useUserHook } from "../../../hooks/useUserHook";
import { CampañasTable } from "./Tables/CampañasTable";

export default function Campañas() {
  const { campañas, fetchCampañas, loading, error } = useUserHook();

  useEffect(() => {
    fetchCampañas();
  }, []);

  return (
    <div className="glass-section">
      <h2>Campañas Disponibles</h2>
      {loading && <p>Cargando campañas...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && <CampañasTable data={campañas} />}
    </div>
  );
}
