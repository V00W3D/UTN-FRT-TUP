import { URL_BASE } from "./config";

// ✅ Obtener el ID desde localStorage
const userId = localStorage.getItem("userId");

if (!userId) {
  alert("⚠️ No se encontró sesión activa.");
  window.location.href = "./index.html";
}

const nombreActual = document.getElementById("nombre-actual");
const imagenActual = document.getElementById("imagen-actual");

const nombreInput = document.getElementById("nombre");
const imagenInput = document.getElementById("imagen");

const nombrePrevia = document.getElementById("nombre-previa");
const imagenPrevia = document.getElementById("imagen-previa");

const nombreChat = document.getElementById("nombre-chat");
const imagenChat = document.getElementById("imagen-chat");

const form = document.getElementById("editar-form");

const cargarUsuario = async () => {
  try {
    const { data } = await axios.get(`${URL_BASE}/usuarios/${userId}`);
    nombreActual.textContent = data.nombre;
    imagenActual.src = data.imagen || "./img/default.png";

    nombreInput.value = data.nombre;
    imagenInput.value = data.imagen;

    actualizarVistaPrevia();
  } catch (err) {
    console.error("❌ Error al cargar usuario:", err);
    alert("Error al cargar datos del usuario.");
    window.location.href = "./index.html";
  }
};

const actualizarVistaPrevia = () => {
  const nuevoNombre = nombreInput.value;
  const nuevaImagen = imagenInput.value || "./img/default.png";

  nombrePrevia.textContent = nuevoNombre;
  imagenPrevia.src = nuevaImagen;

  nombreChat.textContent = nuevoNombre;
  imagenChat.src = nuevaImagen;
};

nombreInput.addEventListener("input", actualizarVistaPrevia);
imagenInput.addEventListener("input", actualizarVistaPrevia);

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    await axios.put(`${URL_BASE}/usuarios/${userId}`, {
      nombre: nombreInput.value,
      imagen: imagenInput.value
    });

    alert("✅ Cambios guardados");
    window.location.href = "./index.html";
  } catch (err) {
    console.error("❌ Error al guardar cambios:", err);
    alert("No se pudieron guardar los cambios.");
  }
});

document.addEventListener("DOMContentLoaded", cargarUsuario);
