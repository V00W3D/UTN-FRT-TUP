// =======================
//      CONFIGURACIÓN
// =======================

/**
 * URL_BASE
 * Ruta base para todas las peticiones al backend.
 */
export const URL_BASE = "http://localhost:8000";

/**
 * main
 * Referencia al contenedor principal `.main` en el DOM.
 */
export const main = document.querySelector(".main");

// =======================
//   MODAL DE CONFIRMACIÓN
// =======================

/**
 * mostrarModalConfirmacion
 * Genera un modal emergente con botones de confirmación y cancelación.
 * Ideal para confirmar acciones destructivas (ej. eliminar).
 * 
 * @param {string} mensaje - Mensaje que se mostrará en el modal.
 * @param {Function} onConfirmar - Función callback que se ejecuta si el usuario confirma.
 */
export const mostrarModalConfirmacion = (mensaje, onConfirmar) => {
  const viejo = document.getElementById("modal-overlay");
  if (viejo) viejo.remove(); // Evita duplicados de modales

  const overlay = document.createElement("div");
  overlay.id = "modal-overlay";
  overlay.classList.add("modal-overlay");

  const modal = document.createElement("div");
  modal.classList.add("modal-contenido");

  modal.innerHTML = `
    <p class="modal-texto">${mensaje}</p>
    <div class="modal-botones">
      <button id="confirmarEliminar">Confirmar</button>
      <button id="cancelarEliminar">Cancelar</button>
    </div>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  const cerrar = () => overlay.remove();

  document.getElementById("cancelarEliminar").addEventListener("click", cerrar);
  document.getElementById("confirmarEliminar").addEventListener("click", () => {
    cerrar();
    onConfirmar(); // Ejecuta acción pasada por parámetro
  });

  // Cierra el modal si se hace clic fuera del contenido
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) cerrar();
  });
};

// =======================
//   VISTA PREVIA DE IMAGEN
// =======================

/**
 * setPreviewImagen
 * Muestra una vista previa dinámica de una URL ingresada en un input.
 * 
 * @param {string} inputSelector - Selector del input de texto con la URL.
 * @param {string} imgSelector - ID del <img> donde se mostrará la vista previa.
 */
export const setPreviewImagen = (inputSelector, imgSelector) => {
  const input = document.querySelector(inputSelector);
  const img = document.getElementById(imgSelector);

  input.addEventListener("input", () => {
    const url = input.value.trim();
    img.src = url;
    img.style.display = url ? "block" : "none"; // Oculta si no hay URL
  });
};
