// =======================
//      IMPORTACIONES
// =======================
import { URL_BASE, main, mostrarModalConfirmacion, setPreviewImagen } from "../config.js"; // Módulos compartidos

// =======================
//     ELEMENTOS GLOBALES
// =======================
let cuerpoProductos;         // Referencia al tbody de productos
let productoEditando = null; // ID del producto que se está editando

// =======================
//     FORMULARIO PRODUCTO
// =======================

/**
 * renderFormularioProducto
 * Renderiza el formulario para agregar o editar un producto.
 * @param {"agregar"|"editar"} modo 
 * @param {Object} datos - Datos del producto a editar (vacío si es agregar)
 */
const renderFormularioProducto = async (modo = "agregar", datos = {}) => {
  const categorias = (await axios.get(`${URL_BASE}/categorias`)).data;

  const opciones = categorias.map(c => `
    <option value="${c.ID_Categoria}" ${c.ID_Categoria === datos.FK_IDCategoria ? "selected" : ""}>
      ${c.nombre_categoria}
    </option>`).join("");

  main.innerHTML = `
    <h2>${modo === "agregar" ? "Añadir" : "Editar"} Producto</h2>
    <form id="formProducto">
      <label>Nombre:</label>
      <input type="text" name="nombre" value="${datos.nombre_prod || ""}" required/>

      <label>Precio:</label>
      <input type="number" step="0.01" name="precio" value="${datos.precio || ""}" required/>

      <label>Stock:</label>
      <input type="number" name="stock" value="${datos.stock || ""}" required/>

      <label>Imagen:</label>
      <input type="text" name="imagen" value="${datos.productos_imagen || ""}"/>
      <div id="preview-container">
        <p>Vista Previa:</p>
        <img id="preview-img" src="${datos.productos_imagen || ""}" style="max-width: 100%; height: auto; display: ${datos.productos_imagen ? "block" : "none"};" />
      </div>

      <label>Categoría:</label>
      <select name="FK_IDCategoria">${opciones}</select>

      <label>Disponibilidad:</label>
      <select name="disponible">
        <option value="true" ${datos.disponible ? "selected" : ""}>Disponible</option>
        <option value="false" ${!datos.disponible ? "selected" : ""}>No disponible</option>
      </select>
      <br>
      <button type="submit">${modo === "agregar" ? "Guardar" : "Actualizar"}</button>
      <button type="button" id="cancelarbtn">Cancelar</button>
    </form>`;

  // Cancelar vuelve a la vista principal
  document.getElementById("cancelarbtn").addEventListener("click", GestionarProductos);

  // Envío del formulario
  document.getElementById("formProducto").addEventListener("submit", async (e) => {
    e.preventDefault();
    const f = e.target;

    const producto = {
      nombre_prod: f.nombre.value,
      precio: parseFloat(f.precio.value),
      stock: parseInt(f.stock.value),
      productos_imagen: f.imagen.value || null,
      disponible: f.disponible.value === "true",
      FK_IDCategoria: parseInt(f.FK_IDCategoria.value)
    };

    const url = modo === "agregar"
      ? `${URL_BASE}/admin/productos/add`
      : `${URL_BASE}/admin/productos/update/${productoEditando}`;

    try {
      await axios[modo === "agregar" ? "post" : "put"](url, producto);
      alert(`Producto ${modo === "agregar" ? "añadido" : "actualizado"} correctamente.`);
      GestionarProductos();
    } catch (err) {
      console.error(err);
      alert("Error al guardar el producto.");
    }
  });

  // Vista previa imagen
  setPreviewImagen('input[name="imagen"]', "preview-img");
};

// =======================
//     FUNCIONES AUXILIARES
// =======================

/**
 * eliminarProducto
 * Elimina un producto luego de mostrar confirmación.
 */
const eliminarProducto = async (id) => {
  try {
    const p = (await axios.get(`${URL_BASE}/productos/${id}`)).data;
    mostrarModalConfirmacion(`¿Eliminar el producto "${p.nombre_prod}"?`, async () => {
      await axios.delete(`${URL_BASE}/admin/productos/delete/${id}`);
      alert("Producto eliminado.");
      GestionarProductos();
    });
  } catch {
    alert("Error al obtener el producto.");
  }
};

/**
 * editarProducto
 * Carga los datos del producto y muestra el formulario en modo edición.
 */
const editarProducto = async (id) => {
  try {
    const p = (await axios.get(`${URL_BASE}/productos/${id}`)).data;
    productoEditando = id;
    renderFormularioProducto("editar", p);
  } catch {
    alert("No se pudo cargar el producto.");
  }
};

// =======================
//     CARGAR PRODUCTOS
// =======================

/**
 * TraerProductos
 * Carga todos los productos o uno solo por ID si se está buscando.
 * @param {boolean} search 
 * @param {string|null} id 
 */
const TraerProductos = async (search = false, busqueda = "") => {
  try {
    const productos = (await axios.get(`${URL_BASE}/productos`)).data;
    const categorias = (await axios.get(`${URL_BASE}/categorias`)).data;

    const lista = search
      ? productos.filter(p => 
          p.nombre_prod.toLowerCase().includes(busqueda.toLowerCase()) ||
          p.ID_Prod.toString() === busqueda
        )
      : productos;

    cuerpoProductos.innerHTML = lista.length > 0
      ? lista.map(p => `
        <tr>
          <td>${p.ID_Prod}</td>
          <td>${p.disponible ? "Disponible" : "No disponible"}</td>
          <td>${p.nombre_prod}</td>
          <td>${categorias.find(c => c.ID_Categoria === p.FK_IDCategoria)?.nombre_categoria || "Sin categoría"}</td>
          <td>$${p.precio}</td>
          <td>${p.stock}</td>
          <td><img src="${p.productos_imagen || "https://i.imgur.com/mYmmbrp.jpeg"}" width="100" height="100"></td>
          <td>
            <button class="btn-eliminar" data-id="${p.ID_Prod}">🗑️</button>
            <button class="btn-editar" data-id="${p.ID_Prod}">🔧</button>
          </td>
        </tr>`).join("")
      : `<tr><td colspan="8">No se encontraron productos.</td></tr>`;
  } catch {
    alert("Error al cargar productos.");
  }
};


// =======================
//     GESTIÓN PRINCIPAL
// =======================

/**
 * GestionarProductos
 * Renderiza la vista principal de gestión de productos con búsqueda, tabla y botón añadir.
 */
const GestionarProductos = () => {
  main.innerHTML = `
    <h2>Gestionando Productos</h2>
    <form id="formsearch">
      <input type="text" id="SearchProducto" placeholder="Buscar producto por ID">
      <button type="submit">🔎</button>
    </form>
    <br>
    <div class="botones-accion">
      <button id="Añadir">Añadir Producto</button>
    </div>
    <br>
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Estado</th>
          <th>Nombre</th>
          <th>Categoria</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Imagen</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody id="cuerpoProductos"></tbody>
    </table>`;

  cuerpoProductos = document.getElementById("cuerpoProductos");

  // Cargar productos al iniciar
  TraerProductos();

  // Abrir formulario para agregar
  document.getElementById("Añadir").addEventListener("click", () => renderFormularioProducto("agregar"));

  // Buscar por ID
document.getElementById("formsearch").addEventListener("submit", (e) => {
  e.preventDefault();
  const texto = document.getElementById("SearchProducto").value.trim();
  texto ? TraerProductos(true, texto) : TraerProductos();
});


  // Manejo de acciones (editar o eliminar)
  cuerpoProductos.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    if (e.target.classList.contains("btn-eliminar")) eliminarProducto(id);
    if (e.target.classList.contains("btn-editar")) editarProducto(id);
  });
};

// =======================
//         EXPORTAR
// =======================
export { GestionarProductos };
