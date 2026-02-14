// =======================
//      IMPORTACIONES
// =======================
import { URL_BASE } from "../config.js"; // URL base de la API

// =======================
//    FUNCIÓN PRINCIPAL
// =======================

/**
 * HandleRegister
 * Maneja el registro de un nuevo usuario.
 * Luego de registrarlo, realiza el login automáticamente y redirige a la tienda.
 */
const HandleRegister = async (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario

    // Captura de valores del formulario
    const nombre_user = document.getElementById("nombre_user").value;
    const mail_user = document.getElementById("mail_user").value;
    const pass = document.getElementById("pass").value;

    try {
        // Registro del nuevo usuario
        await axios.post(`${URL_BASE}/usuarios/register/`, {
            nombre_user,
            pass,
            mail_user
        });

        // Login automático tras el registro exitoso
        const res = await axios.post(`${URL_BASE}/usuarios/login/`, {
            nombre_user,
            pass,
            mail_user
        });

        const usuario = res.data.usuario;
        const id = usuario.ID_Usuario;

        alert("Registro exitoso.");
        window.location.href = `../Inicio/index.html?id=${id}`;
    } catch (err) {
        console.error("Error en el registro:", err);
        alert("Ha ocurrido un error inesperado...");
    }
};

// =======================
//     RENDER DE FORM
// =======================

/**
 * MostrarRegister
 * Renderiza el formulario de registro y le asigna el evento submit.
 */
const MostrarRegister = () => {
    const TituloDocumento = document.getElementById("TituloDocumento"); // Título de la pestaña
    const formlr = document.getElementById("formlr"); // Contenedor del formulario

    // Título del documento
    TituloDocumento.innerText = "TucuFerr - Register";

    // Render del formulario de registro
    formlr.innerHTML = `
        <h2>TucuFerr - Register</h2>
        <label for="nombre_user">Usuario:</label>
        <input type="text" id="nombre_user" required>

        <label for="mail_user">Correo electrónico:</label>
        <input type="email" id="mail_user" required>

        <label for="pass">Contraseña:</label>
        <input type="password" id="pass" required>

        <button type="submit">Registrarse</button>
        <br><br>
        <a href="../login-register/login.html">¿Ya tienes una cuenta? Inicia Sesión.</a>
    `;

    // Evento para manejar el submit del formulario
    formlr.addEventListener("submit", HandleRegister);
};

// =======================
//   INICIALIZACIÓN
// =======================

document.addEventListener("DOMContentLoaded", MostrarRegister); // Ejecutar al cargar el DOM
