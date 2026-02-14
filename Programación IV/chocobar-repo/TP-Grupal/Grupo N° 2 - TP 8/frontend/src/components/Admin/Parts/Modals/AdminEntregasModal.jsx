import { useState } from "react";
import ModalBuilder from "../../../../utils/ModalBuilder";
import { useAdminHook } from "../../../../hooks/useAdminHook";

export function AdminEntregaModal({ entrega, onClose, show }) {
  const { confirmarEntrega, marcarEntregaFallida } = useAdminHook();
  const [comentario, setComentario] = useState("");

  const handleConfirmar = async () => {
    try {
      await confirmarEntrega(entrega.id);
      alert("Entrega confirmada con éxito ✅");
      onClose();
    } catch (err) {
      alert(err.message || "Error al confirmar la entrega");
    }
  };

  const handleFallar = async (e) => {
    e.preventDefault();
    try {
      await marcarEntregaFallida(entrega.id, comentario);
      alert("Entrega marcada como fallida ❌");
      onClose();
    } catch (err) {
      alert(err.message || "Error al marcar como fallida");
    }
  };

  return (
    <ModalBuilder
      show={show}
      title={`Entrega de Donación`}
      onClose={onClose}
      actions={
        <>
          <button className="btn btn-secondary" onClick={onClose}>
            Cerrar
          </button>
          <button className="btn btn-primary" onClick={handleConfirmar}>
            Confirmar Entrega
          </button>
        </>
      }
    >
      <div className="py-3">
        <h5 className="mb-3">Detalles de la Entrega</h5>
        <div className="mb-2">
          <strong>Donación ID:</strong> {entrega?.donacionId}
        </div>
        <div className="mb-2">
          <strong>Beneficiario ID:</strong> {entrega?.beneficiarioId}
        </div>
        <div className="mb-2">
          <strong>Cantidad Entregada:</strong> {entrega?.cantidad_entregada}
        </div>
        <div className="mb-3">
          <strong>Fecha Programada:</strong> {entrega?.fecha_entrega}
        </div>

        <hr />
        <form onSubmit={handleFallar}>
          <h6 className="text-danger">¿Hubo un problema con la entrega?</h6>
          <p className="text-muted mb-2">
            Si la entrega no pudo completarse, deja un comentario y márcala como
            fallida.
          </p>

          <textarea
            className="form-control mb-3"
            placeholder="Motivo o detalles del fallo..."
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            required
          ></textarea>

          <button type="submit" className="btn btn-danger w-100">
            Marcar como Fallida
          </button>
        </form>
      </div>
    </ModalBuilder>
  );
}
