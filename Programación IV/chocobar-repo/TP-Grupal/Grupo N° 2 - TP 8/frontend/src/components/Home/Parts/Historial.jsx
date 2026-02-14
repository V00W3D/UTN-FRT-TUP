import { useEffect } from "react";
import { useUserHook } from "../../../hooks/useUserHook";
import { HistorialTable } from "./Tables/HistorialTable";

export default function Historial() {
  const { donaciones, fetchHistorial, perfil, loading, error } = useUserHook();

  useEffect(() => {
    if (perfil?.id) {
      fetchHistorial(perfil.id);
    } else {
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      if (usuario?.id) fetchHistorial(usuario.id);
    }
  }, [perfil]);

  return (
    <div className="glass-section">
      <h2>Historial de Donaciones</h2>
      {loading && <p>Cargando historial...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && <HistorialTable data={donaciones} />}
    </div>
  );
}
