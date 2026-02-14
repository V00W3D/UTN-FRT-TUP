// =======================
//      IMPORTACIONES
// =======================
import { URL_BASE, main, mostrarModalConfirmacion, setPreviewImagen } from "../config.js";

// =======================
//      VARIABLES GLOBALES
// =======================
let cuerpoUsuarios;            // Referencia al <tbody> donde se renderizan los usuarios
let usuarioEditando = null;    // ID del usuario actualmente en edición

// =======================
//       FORMULARIO
// =======================

/**
 * renderFormularioUsuario
 * Renderiza el formulario para crear o editar un usuario.
 * @param {"agregar"|"editar"} modo 
 * @param {Object} datos - Datos del usuario a editar (vacío si es nuevo)
 */
const renderFormularioUsuario = (modo = "agregar", datos = {}) => {
  main.innerHTML = `
    <h2>${modo === "agregar" ? "Añadir" : "Editar"} Usuario</h2>
    <form id="formUsuario">
      <label>Estado:</label>
      <select name="disponible">
        <option value="true" ${datos.disponible ? "selected" : ""}>Disponible</option>
        <option value="false" ${!datos.disponible ? "selected" : ""}>No disponible</option>
      </select>

      <label>Nombre:</label>
      <input type="text" name="nombre" value="${datos.nombre_user || ""}" required />

      <label>Contraseña:</label>
      <input type="text" name="pass" value="${datos.pass || ""}" required />

      <label>Teléfono:</label>
      <input type="number" name="telefono" value="${datos.telefono_user || ""}" required />

      <label>Mail:</label>
      <input type="email" name="mail" value="${datos.mail_user || ""}" required />

      <label>Imagen:</label>
      <input type="text" name="foto" value="${datos.usuarios_imagen || ""}" />
      <div id="preview-container">
        <p>Vista Previa:</p>
        <img id="preview-img" src="${datos.usuarios_imagen || ""}" style="max-width: 100px; display: ${datos.usuarios_imagen ? "block" : "none"}; border-radius: 8px;" />
      </div>

      <br>
      <button type="submit">${modo === "agregar" ? "Guardar" : "Actualizar"}</button>
      <button type="button" id="cancelarbtn">Cancelar</button>
    </form>
  `;

  // Botón cancelar vuelve a la vista principal
  document.getElementById("cancelarbtn").addEventListener("click", GestionarUsuarios);

  // Evento de envío del formulario
  document.getElementById("formUsuario").addEventListener("submit", async (e) => {
    e.preventDefault();
    const f = e.target;

    // Datos listos para enviar
    const user = {
      disponible: f.disponible.value === "true",
      nombre_user: f.nombre.value,
      pass: f.pass.value,
      telefono_user: f.telefono.value,
      mail_user: f.mail.value,
      usuarios_imagen: f.foto.value || null
    };

    try {
      if (modo === "agregar") {
        await axios.post(`${URL_BASE}/usuarios/register`, user);
        alert("Usuario añadido correctamente.");
      } else {
        await axios.put(`${URL_BASE}/admin/usuarios/update/${usuarioEditando}`, user);
        alert("Usuario actualizado correctamente.");
      }

      usuarioEditando = null;
      GestionarUsuarios();
    } catch (err) {
      console.error(err);
      alert("Error al guardar usuario.");
    }
  });

  // Vista previa de imagen
  setPreviewImagen('input[name="foto"]', "preview-img");
};

// =======================
//       AUXILIARES
// =======================

/**
 * eliminarUsuario
 * Elimina un usuario luego de confirmación.
 */
const eliminarUsuario = async (id) => {
  try {
    const res = await axios.get(`${URL_BASE}/admin/usuarios/${id}`);
    const u = res.data;

    mostrarModalConfirmacion(`¿Eliminar al usuario "${u.nombre_user}"?`, async () => {
      await axios.delete(`${URL_BASE}/admin/usuarios/delete/${id}`);
      alert("Usuario eliminado.");
      GestionarUsuarios();
    });
  } catch (err) {
    console.error(err);
    alert("Error al obtener usuario.");
  }
};

/**
 * editarUsuario
 * Obtiene los datos de un usuario y muestra el formulario de edición.
 */
const editarUsuario = async (id) => {
  try {
    const res = await axios.get(`${URL_BASE}/admin/usuarios/${id}`);
    usuarioEditando = id;
    renderFormularioUsuario("editar", res.data);
  } catch (err) {
    console.error(err);
    alert("Error al cargar el usuario.");
  }
};

// =======================
//     TRAER USUARIOS
// =======================

/**
 * TraerUsuarios
 * Carga todos los usuarios o uno por ID si se busca.
 * @param {boolean} search 
 * @param {string|null} idBuscar 
 */
const TraerUsuarios = async (search = false, filtro = "") => {
  try {
    const res = await axios.get(`${URL_BASE}/admin/usuarios`);
    const usuarios = res.data;

    const lista = search
      ? usuarios.filter(u => 
          u.nombre_user.toLowerCase().includes(filtro.toLowerCase()) ||
          u.ID_Usuario.toString() === filtro
        )
      : usuarios;

    cuerpoUsuarios.innerHTML = lista.length > 0
      ? lista.map(u => `
        <tr>
          <td>${u.ID_Usuario}</td>
          <td>${u.disponible ? "Disponible" : "No disponible"}</td>
          <td>${u.nombre_user}</td>
          <td>${u.pass}</td>
          <td>${u.telefono_user}</td>
          <td>${u.mail_user}</td>
          <td><img src="${u.usuarios_imagen || "https://i.imgur.com/mYmmbrp.jpeg"}" width="100" height="100" /></td>
          <td>
            <button class="btn-eliminar" data-id="${u.ID_Usuario}">🗑️</button>
            <button class="btn-editar" data-id="${u.ID_Usuario}">🔧</button>
          </td>
        </tr>`).join("")
      : `<tr><td colspan="8">No se encontraron usuarios.</td></tr>`;
  } catch (err) {
    console.error(err);
    alert("Error al traer usuarios.");
  }
};


// =======================
//     GESTIÓN PRINCIPAL
// =======================

/**
 * GestionarUsuarios
 * Renderiza la vista principal de gestión de usuarios con tabla, búsqueda y botón de agregar.
 */
const GestionarUsuarios = () => {
  main.innerHTML = `
    <h2>Gestionando Usuarios</h2>
    <form id="formsearch">
      <input type="text" id="SearchUsuarios" placeholder="Buscar usuario por ID">
      <button type="submit">🔎</button>
    </form>
    <br>
    <div class="botones-accion">
      <button id="Añadir">Añadir Usuario</button>
    </div>
    <br>
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Estado</th>
          <th>Nombre</th>
          <th>Contraseña</th>
          <th>Teléfono</th>
          <th>Mail</th>
          <th>Foto</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody id="cuerpoUsuarios"></tbody>
    </table>
  `;

  cuerpoUsuarios = document.getElementById("cuerpoUsuarios");

  // Cargar todos los usuarios al iniciar
  TraerUsuarios();

  // Búsqueda por ID
  document.getElementById("formsearch").addEventListener("submit", (e) => {
    e.preventDefault();
    const texto = document.getElementById("SearchUsuarios").value.trim();
    texto ? TraerUsuarios(true, texto) : TraerUsuarios();
  });


  // Abrir formulario para añadir
  document.getElementById("Añadir").addEventListener("click", () => renderFormularioUsuario("agregar"));

  // Acciones de editar y eliminar
  cuerpoUsuarios.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    if (!id) return;

    if (e.target.classList.contains("btn-eliminar")) eliminarUsuario(id);
    if (e.target.classList.contains("btn-editar")) editarUsuario(id);
  });
};

// =======================
//       EXPORTAR
// =======================
export { GestionarUsuarios };
