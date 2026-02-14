import { ENDPOINTS, STORAGE_KEYS } from "../config.js";
import { mostrarLoginRegister } from "./auth.js";

export async function renderUsuario(userId) {
  try {
    const { data } = await axios.get(`${ENDPOINTS.usuarios}/${userId}`);
    const header = document.querySelector("header");

    if (!header) return;

    const contenedor = document.createElement("div");
    contenedor.className = "usuario-info";

    contenedor.innerHTML = `
      <img src="${data.imagen || './img/default.png'}" alt="${data.nombre}" class="user-img-header">
      <span class="user-nombre">${data.nombre}</span>
      <button id="cerrarSesion">🔒 Cerrar sesión</button>
    `;

    const viejo = document.querySelector(".usuario-info");
    if (viejo) viejo.remove();

    header.appendChild(contenedor);

    document.getElementById("cerrarSesion").addEventListener("click", () => {
      localStorage.removeItem(STORAGE_KEYS.userId);
      location.reload();
    });
  } catch (err) {
    console.error("❌ Error al cargar usuario:", err);
    mostrarLoginRegister();
  }
}
