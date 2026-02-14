// =======================
//      IMPORTACIONES
// =======================
import { GestionarEmpleados } from "./Gestiones/GestionarEmpleados.js"; // Módulo para gestionar empleados
import { GestionarProductos } from "./Gestiones/GestionarProductos.js"; // Módulo para gestionar productos
import { GestionarUsuarios } from "./Gestiones/GestionarUsuarios.js";   // Módulo para gestionar usuarios
import { GestionarVentas } from "./Gestiones/GestionarVentas.js";       // Módulo para gestionar ventas
import { InterfazAdmin } from "./Gestiones/InterfazAdmin.js";           // Vista general del panel admin

// =======================
//     FUNCIÓN PRINCIPAL
// =======================

/**
 * Evento principal al cargar el DOM
 * Renderiza la interfaz de administrador y asigna listeners a los botones del panel.
 */
document.addEventListener("DOMContentLoaded", () => {
  InterfazAdmin();

  document.getElementById("Empleadosbtn").addEventListener("click", GestionarEmpleados);
  document.getElementById("Productosbtn").addEventListener("click", GestionarProductos);
  document.getElementById("Usuariosbtn").addEventListener("click", GestionarUsuarios);
  document.getElementById("Ventasbtn").addEventListener("click", GestionarVentas);
});
