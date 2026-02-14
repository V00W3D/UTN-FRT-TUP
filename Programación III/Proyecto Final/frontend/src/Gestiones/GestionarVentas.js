// =======================
//     IMPORTACIONES
// =======================
import { URL_BASE, main, mostrarModalConfirmacion } from "../config.js";

// =======================
//     VARIABLES GLOBALES
// =======================
let cuerpoVentas; // tbody donde se renderizan las filas de ventas

// =======================
//     FUNCIONES AUXILIARES
// =======================

/**
 * renderFilaExpandida
 * Dado un número de orden, obtiene los productos relacionados
 * y genera una fila expandida con el detalle de los productos.
 * @param {number} orden - Número de orden a expandir
 * @returns {string} - HTML de la fila expandida
 */
const renderFilaExpandida = async (orden) => {
  const productos = (await axios.get(`${URL_BASE}/admin/ventas/${orden}`)).data;
  if (productos.length === 0) return "";

  const usuario = productos[0]; // todos los productos comparten el mismo usuario

  return `
    <tr class="fila-expandida" data-orden="${orden}">
      <td colspan="100%">
        <div class="detalle-orden">
          <strong>Detalle de productos para orden #${orden}</strong>
          <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px;">
            <img class="perfil" src="${usuario.usuarios_imagen}" alt="${usuario.nombre_user}">
            <div>
              <p><strong>ID Usuario:</strong> ${usuario.FK_IDUsuario}</p>
              <p><strong>Nombre:</strong> ${usuario.nombre_user}</p>
            </div>
          </div>
          <table class="productos-tabla">
            <thead>
              <tr>
                <th>ID</th>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${productos.map(p => `
                <tr>
                  <td>${p.FK_IDProd}</td>
                  <td><img src="${p.productos_imagen}" alt="${p.nombre_prod}" width="40"></td>
                  <td>${p.nombre_prod}</td>
                  <td>${p.cantidad}</td>
                  <td>$${p.precio_unitario}</td>
                  <td>$${(p.cantidad * p.precio_unitario).toFixed(2)}</td>
                </tr>`).join("")}
              <tr colspan="3" style="text-align:center;">Total: $${usuario.total_orden}</tr>
            </tbody>
          </table>
        </div>
      </td>
    </tr>`;
};

// =======================
//     TRAER VENTAS
// =======================

/**
 * TraerVentas
 * Obtiene todas las ventas (o una orden específica) y las muestra en tabla.
 * @param {boolean} search - Si se está haciendo búsqueda por número de orden
 * @param {number|null} orden - Número de orden buscado
 */
const TraerVentas = async (search = false, orden = null) => {
  try {
    const ventas = (await axios.get(`${URL_BASE}/admin/ventas${search ? `/${orden}` : ""}`)).data;
    const lista = Array.isArray(ventas) ? ventas : [ventas];

    cuerpoVentas.innerHTML = ""; // Limpiar tabla antes de renderizar

    const ordenesYaMostradas = []; // Evita mostrar varias filas por misma orden

    for (const venta of lista) {
      if (ordenesYaMostradas.includes(venta.numero_orden)) continue;
      ordenesYaMostradas.push(venta.numero_orden);

      const usuario = {
        ID_Usuario: venta.FK_IDUsuario,
        nombre_user: venta.nombre_user,
        usuarios_imagen: venta.usuarios_imagen
      };

      const fila = document.createElement("tr");
      fila.dataset.orden = venta.numero_orden;
      fila.dataset.usuario = usuario.ID_Usuario;
      fila.style.cursor = "pointer";

      // Contenido de la fila principal (venta)
      fila.innerHTML = `
        <td>${venta.ID_Venta}</td>
        <td>${venta.numero_orden}</td>
        <td>${venta.fecha_venta}</td>
        <td>
          <img src="${usuario.usuarios_imagen}" width="50"><br>
          ${usuario.nombre_user}
        </td>
        <td colspan="3" style="text-align:center;">Click para ver productos</td>
        <td>$${venta.total_orden}</td>
        <td>${venta.estado}</td>
        <td><button class="btn-eliminar-venta" data-orden="${venta.numero_orden}">🗑️</button></td>
      `;

      // Evento click sobre la fila: expande o colapsa el detalle de productos
      fila.addEventListener("click", async (e) => {
        // Ignorar si se hace click en el botón de eliminar
        if (e.target.classList.contains("btn-eliminar-venta")) return;

        // Cierra cualquier fila expandida previamente
        const abierta = document.querySelector(".fila-expandida");
        if (abierta) abierta.remove();

        // Cargar y mostrar fila expandida
        const filaDetalle = document.createElement("tr");
        filaDetalle.classList.add("fila-expandida");
        filaDetalle.innerHTML = await renderFilaExpandida(venta.numero_orden);
        fila.insertAdjacentElement("afterend", filaDetalle);
      });

      cuerpoVentas.appendChild(fila);
    }
  } catch (err) {
    console.error("Error al traer ventas:", err);
    alert("No se pudieron cargar las ventas.");
  }
};

// =======================
//     GESTIÓN PRINCIPAL
// =======================

/**
 * GestionarVentas
 * Renderiza la vista principal para gestionar ventas con tabla, búsqueda y eliminación.
 */
const GestionarVentas = () => {
  main.innerHTML = `
    <h2>Gestionando Ventas</h2>
    <form id="formBuscarVentas">
      <input type="number" id="BuscarOrden" placeholder="Buscar por número de orden">
      <button type="submit">🔎</button>
    </form>
    <br>
    <table border="1">
      <thead>
        <tr>
          <th>ID Venta</th>
          <th>N° Orden</th>
          <th>Fecha</th>
          <th>Usuario</th>
          <th colspan="3">Productos</th>
          <th>Total</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody id="cuerpoventas"></tbody>
    </table>
  `;

  cuerpoVentas = document.getElementById("cuerpoventas");

  // Cargar todas las ventas
  TraerVentas();

  // Buscar ventas por número de orden
  document.getElementById("formBuscarVentas").addEventListener("submit", (e) => {
    e.preventDefault();
    const orden = document.getElementById("BuscarOrden").value.trim();
    orden ? TraerVentas(true, orden) : TraerVentas();
  });

  // Eliminar orden completa
  cuerpoVentas.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-eliminar-venta")) {
      const orden = e.target.dataset.orden;
      mostrarModalConfirmacion(`¿Eliminar TODA la orden #${orden}?`, async () => {
        await axios.delete(`${URL_BASE}/admin/ventas/delete/${orden}`);
        alert("Venta eliminada.");
        TraerVentas();
      });
    }
  });
};

// =======================
//        EXPORTAR
// =======================
export { GestionarVentas };
