// =======================
//      IMPORTACIONES
// =======================
import { URL_BASE } from "../config.js"; // Base de URL del backend

// =======================
//     VARIABLES GLOBALES
// =======================
const params = new URLSearchParams(window.location.search);
const IDUsuarioActual = params.get("id"); // ID del usuario actual desde la URL

// =======================
//   FUNCIONES AUXILIARES
// =======================

/**
 * actualizarVistaPrevia
 * Actualiza el panel lateral de vista previa con los datos actuales del formulario.
 * @param {Object} usuario - Objeto con los datos del usuario
 */
const actualizarVistaPrevia = (usuario) => {
  const vista = document.getElementById("previewCard");
  vista.innerHTML = `
    <div class="card-preview">
      <img src="${usuario.usuarios_imagen}" alt="${usuario.nombre_user}" class="preview-img">
      <h3>${usuario.nombre_user}</h3>
      <p><strong>Tel:</strong> ${usuario.telefono_user || "-"}</p>
      <p><strong>Email:</strong> ${usuario.mail_user}</p>
    </div>
  `;
};

/**
 * cargarFormulario
 * Renderiza el formulario de edición con los datos actuales del usuario.
 * También enlaza eventos para vista previa y guardado.
 * @param {Object} usuario - Datos del usuario actual
 */
const cargarFormulario = (usuario) => {
  const container = document.getElementById("editarPerfilContainer");

  container.innerHTML = `
    <div id="formularioPerfil" class="form-container"></div>
    <div id="previewCard" class="preview-container"></div>
  `;

  const formContainer = document.getElementById("formularioPerfil");

  // Formulario editable
  formContainer.innerHTML = `
    <form id="perfilForm" class="perfil-form">
      <label>Nombre: <input type="text" id="nombre" value="${usuario.nombre_user}" required></label>
      <label>Contraseña: <input type="password" id="pass" value="${usuario.pass}" required></label>
      <label>Teléfono: <input type="text" id="telefono" value="${usuario.telefono_user || ''}"></label>
      <label>Email: <input type="email" id="mail" value="${usuario.mail_user}" required></label>
      <label>Imagen (URL): <input type="text" id="imagen" value="${usuario.usuarios_imagen}" required></label>
      <button type="submit">Guardar Cambios</button>
      <button type="button" id="btncancelar">Cancelar</button>
    </form>
  `;

  // Vista previa inicial
  actualizarVistaPrevia(usuario);

  // Botón cancelar vuelve al inicio con sesión
  document.getElementById("btncancelar").addEventListener("click", () => {
    window.location.href = `./index.html?id=${IDUsuarioActual}`;
  });

  // Actualiza la vista previa en tiempo real al modificar campos
  document.querySelectorAll("#perfilForm input").forEach(input => {
    input.addEventListener("input", () => {
      const previewUser = {
        nombre_user: document.getElementById("nombre").value,
        pass: document.getElementById("pass").value,
        telefono_user: document.getElementById("telefono").value,
        mail_user: document.getElementById("mail").value,
        usuarios_imagen: document.getElementById("imagen").value,
      };
      actualizarVistaPrevia(previewUser);
    });
  });

  // Guardar cambios en el backend
  document.getElementById("perfilForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const updatedData = {
      nombre_user: document.getElementById("nombre").value,
      pass: document.getElementById("pass").value,
      telefono_user: document.getElementById("telefono").value,
      mail_user: document.getElementById("mail").value,
      usuarios_imagen: document.getElementById("imagen").value,
    };

    try {
      await axios.put(`${URL_BASE}/admin/usuarios/update/${IDUsuarioActual}`, updatedData);
      alert("Perfil actualizado correctamente.");
      window.location.href = `./index.html?id=${IDUsuarioActual}`;
    } catch (err) {
      console.error("Error al actualizar perfil:", err);
      alert("No se pudo actualizar el perfil.");
    }
  });
};

// =======================
//     FUNCIÓN PRINCIPAL
// =======================

/**
 * IniciarEditarPerfil
 * Comprueba si hay ID válido en la URL, carga datos del usuario y renderiza el formulario.
 * Si no hay sesión válida, redirige al login.
 */
const IniciarEditarPerfil = async () => {
  if (!IDUsuarioActual || isNaN(IDUsuarioActual)) {
    alert("ID de usuario inválido o no proporcionado.");
    window.location.href = "../login-register/login.html";
    return;
  }

  try {
    const res = await axios.get(`${URL_BASE}/admin/usuarios/${IDUsuarioActual}`);
    const usuario = res.data;
    cargarFormulario(usuario);
  } catch (err) {
    console.error("Error al cargar usuario:", err);
    alert("Error al cargar los datos del perfil.");
    window.location.href = "../login-register/login.html";
  }
};

// =======================
//      EXPORTACIÓN
// =======================
export { IniciarEditarPerfil };
