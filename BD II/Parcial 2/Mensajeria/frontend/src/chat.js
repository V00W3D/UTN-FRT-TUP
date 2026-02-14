// =======================
//     IMPORTACIONES
// =======================
import { STORAGE_KEYS, URL_BASE } from "./config.js";

const userId = localStorage.getItem(STORAGE_KEYS.userId);
const salaId = localStorage.getItem(STORAGE_KEYS.salaId);

if (!userId || !salaId) {
  alert("⚠️ No se encontró sesión activa.");
  window.location.href = "./index.html";
}

let participantes = [];
let usuarioActual = {};
let cantidadAnterior = 0;
let mensajeAEditarId = null;

// =======================
//   FUNCIONES USUARIO
// =======================
const cargarUsuario = async () => {
  try {
    const { data } = await axios.get(`${URL_BASE}/usuarios/${userId}`);
    usuarioActual = data;

    const userImg = document.getElementById("user-img");
    const userName = document.getElementById("user-name");

    if (userImg) userImg.src = data.imagen || "./img/default.png";
    if (userName) userName.textContent = "Sala actual";
  } catch (err) {
    console.error("❌ Error al cargar usuario:", err);
  }
};

const cargarSala = async () => {
  try {
    const { data } = await axios.get(`${URL_BASE}/salas/${salaId}`);
    participantes = data.participantes || [];
    console.log("👥 Participantes:", participantes);
  } catch (err) {
    console.error("❌ Error al cargar sala:", err);
  }
};

// =======================
//   FUNCIONES MENSAJES
// =======================
const enviarMensaje = async () => {
  const messageInput = document.getElementById("message-input");
  const texto = messageInput.value.trim();
  if (!texto) return;

  await cargarSala(); // 🔄 REFRESCA participantes ANTES de armar receptores

  const receptores = participantes
    .filter(u => (u._id || u) !== userId)
    .map(u => u._id || u);

  if (!receptores.length) {
    alert("⚠️ No hay receptores disponibles.");
    return;
  }

  try {
    await axios.post(`${URL_BASE}/mensajes/add`, {
      emisor: userId,
      receptor: receptores,
      texto,
      sala: salaId
    });
    messageInput.value = "";
    await cargarMensajes(true);
  } catch (err) {
    console.error("❌ Error al enviar mensaje:", err);
  }
};


const cargarMensajes = async (scroll = false) => {
  const chatContainer = document.getElementById("chat-container");
  try {
    const { data } = await axios.get(`${URL_BASE}/mensajes/sala/${salaId}`);
    console.log("🧾 Mensajes:", data);

    chatContainer.innerHTML = "";
    cantidadAnterior = data.length;

    for (const mensaje of data) {
      const emisorId = typeof mensaje.emisor === "string" ? mensaje.emisor : mensaje.emisor._id;
      const esMio = emisorId === userId;
      const usuario = typeof mensaje.emisor === "string" ? {
        nombre: "Desconocido",
        imagen: "./img/default.png"
      } : mensaje.emisor;

      const bubble = document.createElement("div");
      bubble.classList.add("mensaje", esMio ? "saliente" : "entrante");

      bubble.innerHTML = `
        <div class="mensajeEnviado" data-id="${mensaje._id}">
          <div class="mensaje-header">
            <img src="${usuario.imagen || './img/default.png'}" alt="${usuario.nombre}" class="mini-img">
            <span class="mensaje-nombre">${usuario.nombre}</span>
          </div>
          <p class="mensaje-texto">${mensaje.texto}</p>
          ${esMio ? `
            <div class="mensaje-acciones">
              <button class="editar-btn">✏️</button>
              <button class="borrar-btn">🗑️</button>
            </div>` : ""}
        </div>
      `;

      chatContainer.appendChild(bubble);
    }

    if (scroll || data.length > cantidadAnterior) {
        setTimeout(() => {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }, 0);
    }


  } catch (err) {
    console.error("❌ Error al cargar mensajes:", err);
  }
};

const borrarMensaje = async (id) => {
  try {
    await axios.delete(`${URL_BASE}/mensajes/${id}`);
    await cargarMensajes();
  } catch (err) {
    console.error("❌ Error al borrar mensaje:", err);
  }
};

// =======================
//      MODAL EDICIÓN
// =======================
const abrirModalEdicion = (id, textoActual) => {
  mensajeAEditarId = id;
  const modalEditar = document.getElementById("modal-editar");
  const nuevoTextoInput = document.getElementById("nuevo-texto");
  modalEditar.style.display = "flex";
  nuevoTextoInput.value = textoActual;
};

const cerrarModal = () => {
  const modalEditar = document.getElementById("modal-editar");
  modalEditar.style.display = "none";
  mensajeAEditarId = null;
};

const guardarEdicion = async () => {
  const nuevoTexto = document.getElementById("nuevo-texto").value.trim();
  if (!nuevoTexto) return;

  try {
    await axios.put(`${URL_BASE}/mensajes/${mensajeAEditarId}`, { texto: nuevoTexto });
    cerrarModal();
    await cargarMensajes();
  } catch (err) {
    console.error("❌ Error al editar mensaje:", err);
  }
};

const manejarClickEnMensajes = (e) => {
  const target = e.target;

  if (target.classList.contains("borrar-btn")) {
    const mensajeDiv = target.closest(".mensajeEnviado");
    const id = mensajeDiv.dataset.id;
    borrarMensaje(id);
  }

  if (target.classList.contains("editar-btn")) {
    const mensajeDiv = target.closest(".mensajeEnviado");
    const id = mensajeDiv.dataset.id;
    const textoActual = mensajeDiv.querySelector(".mensaje-texto").textContent;
    abrirModalEdicion(id, textoActual);
  }
};

// =======================
//      CERRAR SESIÓN
// =======================
const cerrarSesion = async () => {
  try {
    await axios.put(`${URL_BASE}/usuarios/${userId}`, { disponible: true });
    localStorage.clear();
    window.location.href = "index.html";
  } catch (err) {
    console.error("❌ Error al cerrar sesión:", err);
  }
};

const liberarUsuarioAntesDeSalir = () => {
  navigator.sendBeacon(`${URL_BASE}/usuarios/${userId}/liberar`);
};

// =======================
//         INICIO
// =======================
document.addEventListener("DOMContentLoaded", async () => {
  try {
    await axios.put(`${URL_BASE}/salas/${salaId}/agregar/${userId}`);
    await cargarUsuario();
    await cargarSala();
    await cargarMensajes(true);
    
    setInterval(cargarSala,1000)
    setInterval(cargarMensajes, 1000);
    setInterval(cargarUsuario, 5000);

    document.getElementById("cancelar-edicion").addEventListener("click", cerrarModal);
    document.getElementById("guardar-edicion").addEventListener("click", guardarEdicion);
    document.getElementById("send-btn").addEventListener("click", enviarMensaje);
    document.getElementById("message-input").addEventListener("keypress", (e) => {
      if (e.key === "Enter") enviarMensaje();
    });
    document.getElementById("chat-container").addEventListener("click", manejarClickEnMensajes);
    document.getElementById("cerrar-sesion").addEventListener("click", cerrarSesion);
    window.addEventListener("beforeunload", liberarUsuarioAntesDeSalir);
  } catch (err) {
    console.error("❌ Error al iniciar:", err);
  }
});
