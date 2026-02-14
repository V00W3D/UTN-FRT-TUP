// =======================
//      IMPORTACIONES
// =======================
import { URL_BASE } from "../config.js"; // URL base de la API para hacer peticiones

// =======================
//    FUNCIÓN PRINCIPAL
// =======================

/**
 * HandleLogin
 * Maneja el evento de envío del formulario de login.
 * Valida credenciales contra el backend y redirige según el rol del usuario.
 */
const HandleLogin = async (e) => {
    e.preventDefault(); // Evita que el formulario se recargue

    // Obtener valores del formulario
    const nombre_user = document.getElementById("nombre_user").value;
    const pass = document.getElementById("pass").value;

    try {
        // Enviar credenciales al backend
        const response = await axios.post(`${URL_BASE}/usuarios/login/`, { nombre_user, pass });
        const data = response.data;

        if (data.existe) {
            const usuario = data.usuario;
            const id = usuario.ID_Usuario;

            alert("Inicio de sesión exitoso");

            // Redirigir según el rol
            if (usuario.rol === "user") {
                window.location.href = `../Inicio/index.html?id=${id}`;
            } else if (usuario.rol === "admin") {
                window.location.href = `../Admin/admin.html?id=${id}`;
            }
        } else {
            alert("Usuario o contraseña incorrectos");
        }

    } catch (err) {
        console.error("Error en el login:", err);
        alert("Ha ocurrido un error inesperado...");
    }
};

// =======================
//     RENDER DE LOGIN
// =======================

/**
 * MostrarLogin
 * Renderiza el formulario de login dentro del div con ID "formlr".
 * También asigna el evento submit al formulario.
 */
const MostrarLogin = () => {
    const TituloDocumento = document.getElementById("TituloDocumento"); // Título de la pestaña
    const formlr = document.getElementById("formlr"); // Contenedor del formulario

    // Cambiar título de la página
    TituloDocumento.innerText = "TucuFerr - Login";

    // Render del formulario
    formlr.innerHTML = `
        <h2>TucuFerr - Login</h2>
        <label for="nombre_user">Usuario:</label>
        <input type="text" id="nombre_user" required>

        <label for="pass">Contraseña:</label>
        <input type="password" id="pass" required>

        <button type="submit">Ingresar</button>
        <br><br>
        <a href="../login-register/register.html">¿No tienes una cuenta? Registrate.</a>
    `;

    // Asignar evento submit
    formlr.addEventListener("submit", HandleLogin);
};

// =======================
//   INICIALIZACIÓN
// =======================

document.addEventListener("DOMContentLoaded", MostrarLogin); // Ejecutar al cargar el DOM
