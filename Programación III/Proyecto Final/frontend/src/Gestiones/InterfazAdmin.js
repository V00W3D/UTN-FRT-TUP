// =======================
//      IMPORTACIONES
// =======================
import { URL_BASE } from "../config.js"; // Base de URL del backend

// =======================
//   FUNCIONES AUXILIARES
// =======================

/**
 * cerrarSesionAdmin
 * Redirige al login eliminando visualmente la sesión del administrador.
 */
const cerrarSesionAdmin = async () => {
  try {
    window.location.href = "../login-register/login.html"; // Redirección simple
  } catch (err) {
    console.error("Error al cerrar sesión:", err);
    alert("Error al cerrar sesión.");
  }
};

// =======================
//     FUNCIÓN PRINCIPAL
// =======================

/**
 * InterfazAdmin
 * Valida la sesión del administrador usando el parámetro "id" de la URL.
 * Si está autorizado, renderiza su perfil y opciones de gestión.
 * Si no lo está, redirige al login con mensaje de advertencia.
 */
const InterfazAdmin = async () => {
  const DatosAdmin = document.getElementById("DatosAdmin");
  DatosAdmin.innerHTML = `<h2>Cargando perfil de administrador...</h2>`; // Mensaje inicial

  try {
    // Obtener ID de usuario desde la URL
    const params = new URLSearchParams(window.location.search);
    const IDUsuarioActual = params.get("id");

    // Validación: si no hay ID en la URL, no hay sesión activa
    if (!IDUsuarioActual) {
      alert("No hay sesión activa como administrador.");
      window.location.href = "../login-register/login.html";
      return;
    }

    // Petición al backend para obtener los datos del usuario
    const resAdmin = await axios.get(`${URL_BASE}/admin/usuarios/${IDUsuarioActual}`);
    const admin = resAdmin.data;

    // Validación: si no es admin, redirigir
    if (!admin || admin.rol !== "admin") {
      alert("Usuario no autorizado.");
      window.location.href = "../login-register/login.html";
      return;
    }

    // Si pasa todas las validaciones, renderiza la interfaz del admin
    DatosAdmin.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
        <img src="${admin.usuarios_imagen}" alt="${admin.nombre_user}" width="120">
        <p><strong>${admin.nombre_user}</strong></p>
        <h3>¿Qué desea Gestionar hoy?</h3>
        <button id="btnCerrarSesion" style="margin-top: 10px;">Cerrar sesión</button>
      </div>
    `;

    // Evento: cerrar sesión
    const btnCerrar = document.getElementById("btnCerrarSesion");
    btnCerrar.addEventListener("click", () => cerrarSesionAdmin());

  } catch (err) {
    console.error("Error al cargar el perfil del administrador:", err);
    alert("Hubo un error cargando la interfaz del administrador.");
    window.location.href = "../login-register/login.html";
  }
};

// =======================
//        EXPORTACIÓN
// =======================
export { InterfazAdmin };
