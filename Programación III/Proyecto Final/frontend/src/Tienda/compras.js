// =======================
//      IMPORTACIONES
// =======================
import { URL_BASE } from "../config.js"; // URL base del backend

// =======================
//     VARIABLES GLOBALES
// =======================
const main = document.querySelector(".main"); // Contenedor principal de la vista
const params = new URLSearchParams(window.location.search);
const IDUsuarioActual = params.get("id"); // ID del usuario desde la URL
const btnTienda = document.getElementById("btnTienda"); // Botón para volver a la tienda

// =======================
//   FUNCIONES AUXILIARES
// =======================

/**
 * obtenerCarrito
 * Trae todos los productos del carrito del usuario actual.
 * @returns {Array} Lista de ítems del carrito filtrados por usuario
 */
const obtenerCarrito = async () => {
  try {
    const res = await axios.get(`${URL_BASE}/carrito/get`);
    return res.data.filter(item => item.FK_IDUsuario == IDUsuarioActual);
  } catch (err) {
    console.error("Error al obtener el carrito:", err);
    return [];
  }
};

/**
 * cambiarCantidad
 * Aumenta, disminuye o elimina productos del carrito según la cantidad.
 * @param {number} id_carrito - ID del ítem en el carrito
 * @param {number} nuevaCantidad - Nueva cantidad deseada
 */
const cambiarCantidad = async (id_carrito, nuevaCantidad) => {
  try {
    if (nuevaCantidad <= 0) {
      await axios.delete(`${URL_BASE}/carrito/delete/${id_carrito}`);
    } else {
      await axios.put(`${URL_BASE}/carrito/update/${id_carrito}`, { cantidad: nuevaCantidad });
    }
    mostrarCarritoSPA(); // Refrescar vista
  } catch (err) {
    console.error("Error al actualizar cantidad:", err);
    alert("No se pudo actualizar la cantidad.");
  }
};

/**
 * mostrarModalCompra
 * Genera un modal con el resumen de la compra y opciones de confirmar o cancelar.
 * @param {Array} productos - Lista de productos en el carrito
 * @param {number} total - Total acumulado
 * @param {Function} onConfirmar - Función que se ejecuta al confirmar la compra
 */
const mostrarModalCompra = (productos, total, onConfirmar) => {
  const modalExistente = document.getElementById("modalCompra");
  if (modalExistente) modalExistente.remove(); // Evitar duplicados

  const modal = document.createElement("div");
  modal.id = "modalCompra";

  modal.innerHTML = `
    <div class="modal-contenido">
      <h2>Comprobante de Compra</h2>
      <div class="modal-detalles">
        ${productos.map(p => `
          <div class="modal-item">
            <div class="modal-item-info">
              <h2>x${p.cantidad}</h2>
              <div>
                <p><strong>${p.nombre}</strong></p>
                <p>Precio unitario: $${p.precio}</p>
                <h2>Subtotal$${p.cantidad * p.precio}</h2>
              </div>
              <img src="${p.productos_imagen}" alt="${p.nombre}" />
            </div>
          </div>
        `).join("")}
      </div>
      <div class="modal-total">Total: <strong>$${total}</strong></div>
      <div class="modal-botones">
        <button id="confirmarCompra">Confirmar </button>
        <button id="cancelarCompra">Cancelar </button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Cancelar cierra el modal
  document.getElementById("cancelarCompra").addEventListener("click", () => {
    modal.remove();
  });

  // Confirmar ejecuta callback (onConfirmar)
  document.getElementById("confirmarCompra").addEventListener("click", async () => {
    modal.remove();
    await onConfirmar();
  });
};

/**
 * finalizarCompra
 * Envía la venta al backend, limpia el carrito y actualiza la interfaz.
 */
const finalizarCompra = async () => {
  const carrito = await obtenerCarrito();
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  let totalVenta = 0;
  const productos = carrito.map(item => {
    const subtotal = item.cantidad * item.precio;
    totalVenta += subtotal;

    return {
      id: item.ID_Prod,
      nombre: item.nombre_prod,
      cantidad: item.cantidad,
      precio: item.precio,
      productos_imagen: item.productos_imagen
    };
  });

  mostrarModalCompra(productos, totalVenta, async () => {
    try {
      const venta = {
        usuario: parseInt(IDUsuarioActual),
        productos: productos.map(p => ({
          id: p.id,
          cantidad: p.cantidad,
          precio: p.precio
        })),
        total: totalVenta
      };

      await axios.post(`${URL_BASE}/admin/ventas/add`, venta);
      await axios.delete(`${URL_BASE}/carrito/clear`);

      alert("¡Compra realizada con éxito!");
      mostrarCarritoSPA();
    } catch (err) {
      console.error("Error al finalizar compra:", err);
      alert("No se pudo completar la compra.");
    }
  });
};

/**
 * renderItemsCarrito
 * Renderiza visualmente los productos del carrito y muestra controles de cantidad.
 */
const renderItemsCarrito = async () => {
  const carrito = await obtenerCarrito();

  if (carrito.length === 0) {
    main.innerHTML += `<p>El carrito está vacío.</p>`;
    return;
  }

  let total = 0;
  carrito.forEach(item => {
    const subtotal = item.cantidad * item.precio;
    total += subtotal;

    main.innerHTML += `
      <div class="carrito-item">
        <img src="${item.productos_imagen}" alt="${item.nombre_prod}">
        <div class="carrito-info">
          <p><strong>${item.nombre_prod}</strong></p>
          <p>Precio: $${item.precio}</p>
          <p>Cantidad: ${item.cantidad}</p>
          <p>Subtotal: $${subtotal}</p>
        </div>
        <div class="carrito-controles">
          <button class="cambiar" data-id="${item.ID_Carrito}" data-cantidad="${item.cantidad - 1}">➖</button>
          <button class="cambiar" data-id="${item.ID_Carrito}" data-cantidad="${item.cantidad + 1}">➕</button>
        </div>
      </div>
    `;
  });

  main.innerHTML += `
    <div class="carrito-total">Total: $${total}</div>
    <div class="carrito-finalizar">
      <button id="finalizarCompraBtn">Finalizar compra</button>
    </div>
  `;

  // Controlar botones de cantidad
  document.querySelectorAll(".cambiar").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const nuevaCantidad = parseInt(btn.dataset.cantidad);
      cambiarCantidad(id, nuevaCantidad);
    });
  });

  document.getElementById("finalizarCompraBtn").addEventListener("click", finalizarCompra);
};

// =======================
//     FUNCIÓN PRINCIPAL
// =======================

/**
 * mostrarCarritoSPA
 * Controla toda la vista del carrito: validación de sesión, render de productos y total.
 */
const mostrarCarritoSPA = () => {
  if (!IDUsuarioActual) {
    main.innerHTML = "<p>Debes iniciar sesión para ver el carrito.</p>";
    return;
  }

  // Redirigir correctamente el botón de volver a tienda
  if (btnTienda) {
    btnTienda.href = `../Inicio/index.html?id=${IDUsuarioActual}`;
  }

  main.innerHTML = "<h2>Carrito de compras</h2>";
  renderItemsCarrito();
};

// =======================
//      EXPORTACIÓN
// =======================
export { mostrarCarritoSPA };
