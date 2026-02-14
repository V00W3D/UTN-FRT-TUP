// =======================
//      IMPORTACIONES
// =======================
import { URL_BASE, main, setPreviewImagen, mostrarModalConfirmacion } from "../config.js"; // Utilidades compartidas

// =======================
//   BOTONES & ELEMENTOS
// =======================
let cuerpoEmpleados;          // Referencia al tbody donde se renderizan los empleados
let empleadoEditando = null;  // ID del empleado que se está editando (si corresponde)

// =======================
//   FORMULARIO DINÁMICO
// =======================

/**
 * renderFormularioEmpleado
 * Renderiza el formulario de "Agregar" o "Editar" empleado dinámicamente.
 * @param {"agregar"|"editar"} modo 
 * @param {Object} datos - Datos del empleado (solo para modo editar)
 */
const renderFormularioEmpleado = (modo = "agregar", datos = {}) => {
  main.innerHTML = `
    <h2>${modo === "agregar" ? "Añadir" : "Editar"} Empleado</h2>
    <form id="formEmpleado">
      <label for="nombre">Nombre:</label>
      <input type="text" name="nombre" value="${datos.nombre_empleado || ""}" required/>

      <label for="telefono">Teléfono:</label>
      <input type="text" name="telefono" value="${datos.telefono_empleado || ""}" required/>

      <label for="mail">Email:</label>
      <input type="email" name="mail" value="${datos.mail_empleado || ""}" required/>

      <label for="imagen">Imagen:</label>
      <input type="text" name="imagen" value="${datos.empleados_imagen || ""}"/>

      <div id="preview-container">
        <p>Vista Previa:</p>
        <img id="preview-img" src="${datos.empleados_imagen || ""}" style="max-width:100%; height:auto; display:${datos.empleados_imagen ? "block" : "none"}; margin-top:10px; border-radius:8px;" alt="Vista previa"/>
      </div>

      ${modo === "editar" ? `
        <label for="estado">Estado:</label>
        <select name="estado">
          <option value="activo" ${datos.estado === "activo" ? "selected" : ""}>Activo</option>
          <option value="despedido" ${datos.estado === "despedido" ? "selected" : ""}>Despedido</option>
        </select>` : ""}

      <br>
      <button type="submit">${modo === "agregar" ? "Guardar" : "Actualizar"}</button>
      <button type="button" id="cancelarbtn">Cancelar</button>
    </form>
  `;

  // Botón cancelar vuelve a la gestión principal
  document.getElementById("cancelarbtn").addEventListener("click", GestionarEmpleados);

  // Evento de envío del formulario
  document.getElementById("formEmpleado").addEventListener("submit", async (e) => {
    e.preventDefault();
    const f = e.target;

    // Objeto empleado listo para enviar al backend
    const empleado = {
      nombre_empleado: f.nombre.value,
      telefono_empleado: f.telefono.value,
      mail_empleado: f.mail.value,
      empleados_imagen: f.imagen.value || null,
      estado: f.estado?.value || "activo"
    };

    try {
      if (modo === "agregar") {
        await axios.post(`${URL_BASE}/admin/empleados/add`, empleado);
        alert("Empleado añadido correctamente.");
      } else {
        await axios.put(`${URL_BASE}/admin/empleados/update/${empleadoEditando}`, empleado);
        alert("Empleado actualizado correctamente.");
        empleadoEditando = null;
      }
      GestionarEmpleados();
    } catch (err) {
      console.error(err);
      alert("Error al guardar el empleado.");
    }
  });

  // Activar vista previa de imagen
  setPreviewImagen('input[name="imagen"]', "preview-img");
};

// =======================
//   FUNCIONES AUXILIARES
// =======================

/**
 * eliminarEmpleado
 * Elimina un empleado luego de mostrar confirmación.
 */
const eliminarEmpleado = async (id) => {
  try {
    const res = await axios.get(`${URL_BASE}/admin/empleados/${id}`);
    const empleado = res.data;

    mostrarModalConfirmacion(`¿Eliminar a "${empleado.nombre_empleado}"?\n\n<img src=${empleado.empleados_imagen}>`, async () => {
      await axios.delete(`${URL_BASE}/admin/empleados/delete/${id}`);
      alert("Empleado eliminado.");
      GestionarEmpleados();
    });
  } catch (err) {
    console.error(err);
    alert("No se pudo obtener el empleado.");
  }
};

/**
 * editarEmpleado
 * Obtiene los datos de un empleado y muestra el formulario en modo edición.
 */
const editarEmpleado = async (id) => {
  try {
    const res = await axios.get(`${URL_BASE}/admin/empleados/${id}`);
    empleadoEditando = id;
    renderFormularioEmpleado("editar", res.data);
  } catch (err) {
    console.error(err);
    alert("Error al cargar el empleado.");
  }
};

// =======================
//     TRAER EMPLEADOS
// =======================

/**
 * TraerEmpleados
 * Muestra todos los empleados o filtra por ID.
 * @param {boolean} search 
 * @param {string|null} ID_search 
 */
const TraerEmpleados = async (search = false, filtro = "") => {
  try {
    const empleados = (await axios.get(`${URL_BASE}/admin/empleados`)).data;

    const lista = search
      ? empleados.filter(e =>
          e.nombre_empleado.toLowerCase().includes(filtro.toLowerCase()) ||
          e.ID_Empleado.toString() === filtro
        )
      : empleados;

    cuerpoEmpleados.innerHTML = lista.length > 0
      ? lista.map(e => `
        <tr>
          <td>${e.ID_Empleado}</td>
          <td>${e.disponible ? "Disponible" : "No disponible"}</td>
          <td>${e.nombre_empleado}</td>
          <td>${e.telefono_empleado}</td>
          <td>${e.mail_empleado}</td>
          <td><img src="${e.empleados_imagen || "https://i.imgur.com/mYmmbrp.jpeg"}" width="100" height="100"></td>
          <td>
            <button class="btn-eliminar" data-id="${e.ID_Empleado}">🗑️</button>
            <button class="btn-editar" data-id="${e.ID_Empleado}">🔧</button>
          </td>
        </tr>`).join("")
      : `<tr><td colspan="8">No se encontraron empleados.</td></tr>`;
  } catch (err) {
    console.error("Error al traer empleados:", err);
    alert("No se pudieron cargar los empleados.");
  }
};


// =======================
//   GESTIÓN PRINCIPAL
// =======================

/**
 * GestionarEmpleados
 * Renderiza la vista principal de gestión de empleados con formulario de búsqueda y tabla.
 */
const GestionarEmpleados = () => {
  main.innerHTML = `
    <h2>Gestionando Empleados</h2>
    <form id="formsearch">
      <input type="text" id="SearchEmpleado" placeholder="Buscar empleado por ID">
      <button type="submit">🔎</button>
    </form>
    <br>
    <div class="botones-accion">
      <button id="Añadir">Añadir Empleado</button>
    </div>
    <br>
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Estado</th>
          <th>Nombre</th>
          <th>Teléfono</th>
          <th>Email</th>
          <th>Foto</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody id="cuerpoEmpleados"></tbody>
    </table>
  `;

  // Capturar tbody para llenarlo luego
  cuerpoEmpleados = document.getElementById("cuerpoEmpleados");

  // Cargar empleados
  TraerEmpleados();

  // Añadir nuevo empleado
  document.getElementById("Añadir").addEventListener("click", () => renderFormularioEmpleado("agregar"));

  // Búsqueda por ID
  document.getElementById("formsearch").addEventListener("submit", (e) => {
    e.preventDefault();
    const texto = document.getElementById("SearchEmpleado").value.trim();
    texto ? TraerEmpleados(true, texto) : TraerEmpleados();
  });


  // Acciones de editar o eliminar
  cuerpoEmpleados.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-eliminar")) {
      eliminarEmpleado(e.target.dataset.id);
    } else if (e.target.classList.contains("btn-editar")) {
      editarEmpleado(e.target.dataset.id);
    }
  });
};

// =======================
//       EXPORTACIÓN
// =======================

export { GestionarEmpleados };
