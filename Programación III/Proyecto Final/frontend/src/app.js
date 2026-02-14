// =======================
//      IMPORTACIONES
// =======================
import { IniciarTienda } from "./Tienda/tienda.js"; // Módulo que contiene la lógica de la tienda

// =======================
//     FUNCIÓN PRINCIPAL
// =======================

/**
 * Evento principal al cargar el DOM
 * Llama al módulo de la tienda para inicializar su vista.
 */
document.addEventListener("DOMContentLoaded", () => {
  IniciarTienda();
});
