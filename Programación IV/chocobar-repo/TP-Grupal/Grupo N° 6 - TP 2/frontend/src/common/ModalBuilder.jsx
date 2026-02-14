import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { Portal } from "../main"; // 👈 importamos tu Portal
import "../Styles/ModalBuilder.css"; // 🌸 estilos Sakura

/**
 * ModalBuilder — Versión Sakura 🌸 con Portal externo
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

  return (
    <Portal>
      <AnimatePresence mode="wait">
        {show && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{ pointerEvents: show ? "auto" : "none" }} // 👈 evita bloquear clics
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
              {/* 🌸 Botón de cierre */}
              <button
                className="modal-close-btn"
                aria-label="Cerrar"
                onClick={onClose}
              >
                ✕
              </button>

              {/* 🌸 Título opcional */}
              {title && <h3 className="modal-title">{title}</h3>}

              {/* 🌸 Cuerpo del modal */}
              <div className="modal-body">{children}</div>

              {/* 🌸 Acciones opcionales */}
              {actions && <div className="modal-actions">{actions}</div>}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
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
