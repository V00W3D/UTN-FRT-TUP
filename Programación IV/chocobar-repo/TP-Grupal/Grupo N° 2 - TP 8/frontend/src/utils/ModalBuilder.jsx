import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import "../CSS/ModalBuilder.css"; // estilos base reutilizables

/**
 * ModalBuilder — Crea un modal genérico y reutilizable
 * Props:
 * - show: boolean — controla si el modal se muestra o no
 * - title: string — título del modal
 * - children: JSX — contenido del cuerpo del modal
 * - onClose: function — función para cerrar el modal
 * - actions: JSX — botones o acciones opcionales del footer
 * - width: string — ancho máximo opcional (ej: "500px")
 */
export default function ModalBuilder({
  show,
  title,
  children,
  onClose,
  actions,
  width = "500px",
}) {
  if (typeof document === "undefined") return null;

  const portalRoot = document.getElementById("portal-root");
  if (!portalRoot) return null;

  return createPortal(
    <AnimatePresence>
      {show && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-container"
            style={{ maxWidth: width }}
            initial={{ scale: 0.9, opacity: 0, y: -30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -30 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {title && <h3 className="modal-title mb-3">{title}</h3>}

            <div className="modal-body">{children}</div>

            {actions && <div className="modal-actions mt-3">{actions}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    portalRoot
  );
}

ModalBuilder.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  actions: PropTypes.node,
  width: PropTypes.string,
};
