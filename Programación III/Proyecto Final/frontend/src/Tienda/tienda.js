// =======================
//      IMPORTACIONES
// =======================
import { URL_BASE } from "../config.js"; // URL base del backend
import { mostrarCarritoSPA } from "./compras.js"; // Vista del carrito SPA

// =======================
//   VARIABLES GLOBALES
// =======================
let index = 0; // Índice actual del carrusel
let slides = []; // Array de imágenes del carrusel
let track; // Contenedor de las slides
let IDUsuarioActual = null; // ID del usuario desde la URL
const btnTienda = document.getElementById("btnTienda"); // Botón para volver a la tienda

// =======================
//   FUNCIONES AUXILIARES
// =======================

/**
 * obtenerUsuarioActual
 * Extrae el ID del usuario desde la URL (parámetro ?id=).
 */
const obtenerUsuarioActual = async () => {
  try {
    const params = new URLSearchParams(window.location.search);
    IDUsuarioActual = params.get("id");   
  } catch (err) {
    console.error("Error al obtener la sesión actual:", err);
  }
};

/**
 * updateCarousel
 * Cambia la posición del carrusel al índice actual.
 */
const updateCarousel = () => {
  const slideWidth = slides[0].clientWidth;
  track.style.transform = `translateX(-${index * slideWidth}px)`;
};

/**
 * agregarAlCarrito
 * Añade un producto al carrito del usuario actual.
 * @param {number} id - ID del producto a añadir
 */
const agregarAlCarrito = async (id) => {
  if (!IDUsuarioActual) {
    alert("Debes iniciar sesión para añadir productos al carrito.");
    return;
  }

  try {
    const cantidad = 1;

    const body = {
      FK_IDUsuario: IDUsuarioActual,
      FK_IDProd: parseInt(id),
      cantidad
    };

    const res = await axios.post(`${URL_BASE}/carrito/add`, body);
    alert(res.data.message);
  } catch (err) {
    console.error("Error al añadir al carrito:", err);
    alert("No se pudo añadir el producto.");
  }
};

// =======================
//     RENDER CARRUSEL
// =======================

/**
 * renderCarousel
 * Genera y controla el carrusel de imágenes en la tienda.
 */
const renderCarousel = () => {
  const main = document.querySelector(".main");
  main.innerHTML = `
    <section class="carousel">
      <div class="carousel-track">
        <img src="https://preview.redd.it/is-there-anymore-of-these-dbz-construction-memes-v0-aq8wmelvq7xd1.jpeg?width=1080&crop=smart&auto=webp&s=7c66bedf48d1442536571394c555f00ecfb87435" class="carousel-slide" alt="Slide 1">
        <img src="https://img.wattpad.com/953a1c11b8312c43f458f6900e7eb6d844f76232/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f7043466a6a54664e4a49646879773d3d2d3931312e313534383837386437376434383838343939303737373433333835302e6a7067?s=fit&w=720&h=720" class="carousel-slide" alt="Slide 2">
        <img src="https://images3.memedroid.com/images/UPLOADED896/616b98c98ab32.jpeg" class="carousel-slide" alt="Slide 3">
      </div>
      <button class="carousel-btn prev">◀</button>
      <button class="carousel-btn next">▶</button>
    </section>
    <div id="cardsSection">
      <div class="cards-container" id="cardsContainer"></div>
    </div>
  `;

  track = document.querySelector(".carousel-track");
  slides = Array.from(document.querySelectorAll(".carousel-slide"));

  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");

  prevBtn.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length; 
    updateCarousel();
  });

  nextBtn.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    updateCarousel();
  });

  setInterval(() => {
    index = (index + 1) % slides.length;
    updateCarousel();
  }, 5000);
};

// =======================
//   RENDER PRODUCTOS
// =======================

/**
 * renderProductos
 * Muestra todas las tarjetas de productos, con filtro opcional por nombre.
 * @param {boolean} search - Si se está haciendo una búsqueda
 * @param {string} searchproductos - Texto a buscar
 */
const renderProductos = async (search = false, searchproductos = "") => {
  try {
    const res = await axios.get(`${URL_BASE}/productos`);
    const todos = Array.isArray(res.data) ? res.data : [res.data];
    
    const productos = search
      ? todos.filter(p => p.nombre_prod.toLowerCase().includes(searchproductos.toLowerCase()))
      : todos;

    const container = document.getElementById("cardsContainer");
    container.innerHTML = "";

    if (productos.length === 0) {
      container.innerHTML = `<p>No se encontraron productos que coincidan con "${searchproductos}".</p>`;
      return;
    }

    const categorias = (await axios.get(`${URL_BASE}/categorias`)).data;
    productos.forEach(p => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="${p.productos_imagen}" alt="${p.nombre_prod}">
        <p><strong>${p.nombre_prod}</strong></p>
        <p><strong>${categorias.find(c => c.ID_Categoria === p.FK_IDCategoria)?.nombre_categoria || "Sin categoría"}</strong></p>
        <p>Stock: ${p.stock}</p>
        <p><span style="color:lightgreen;">$${p.precio}</span></p>
        <button type="button" class="carrito-plus" data-id="${p.ID_Prod}">
          <img src="https://images.icon-icons.com/3252/PNG/512/toolbox_regular_icon_204739.png" alt="Añadir al carrito" height="20px" width="20px">
        </button>
      `;
      container.appendChild(card);
    });

    document.querySelectorAll(".carrito-plus").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        agregarAlCarrito(id);
      });
    });

  } catch (err) {
    console.error("Error al cargar productos:", err);
    alert("No se pudieron cargar los productos.");
  }
};

// =======================
//   INICIALIZAR TIENDA
// =======================

/**
 * IniciarTienda
 * Ejecuta todo lo necesario para mostrar la tienda al usuario.
 */
const IniciarTienda = async () => {
  await obtenerUsuarioActual();
  renderCarousel();
  renderProductos();

  const btnIrAlCarrito = document.getElementById("btnIrAlCarrito");
  if (btnIrAlCarrito) {
    btnIrAlCarrito.addEventListener("click", () => {
      if (!IDUsuarioActual) {
        alert("Debes iniciar sesión para acceder al carrito.");
        return;
      }
      mostrarCarritoSPA();
    });
  }

  const form = document.getElementById("formSearch");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const search = document.getElementById("searchproductos").value.trim();
      renderCarousel();
      await renderProductos(search !== "", search);
    });
  }

  document.getElementById("btnSesion").addEventListener("click",()=>{
    window.location.href="../login-register/login.html"
  })

  const usuarioactualDiv = document.getElementById("usuarioactual");
  if (usuarioactualDiv && IDUsuarioActual) {
    try {
      const resUsuario = await axios.get(`${URL_BASE}/admin/usuarios/${IDUsuarioActual}`);
      const usuario = resUsuario.data;

      usuarioactualDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
          <img src="${usuario.usuarios_imagen}" alt="${usuario.nombre_user}" width="40" height="40" style="border-radius: 50%;">
          <span style="font-weight: bold;">${usuario.nombre_user}</span>
          <a href="./perfil.html?id=${IDUsuarioActual}" title="Editar perfil">
            <img src="https://cdn-icons-png.flaticon.com/512/126/126472.png" width="60px" height="60px" alt="Config">
          </a>
        </div>
      `;

      document.getElementById("btnSesion").innerHTML = "Cerrar Sesión"

      if (btnTienda) {
        btnTienda.href = `../Inicio/index.html?id=${IDUsuarioActual}`;
      }

    } catch (err) {
      console.error("Error al cargar datos del usuario:", err);
      usuarioactualDiv.innerText = "Error al cargar usuario";
    }
  }
};

// =======================
//      EXPORTACIÓN
// =======================
export { IniciarTienda };
