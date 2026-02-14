import { ENDPOINTS, STORAGE_KEYS } from "../config.js";

export const mostrarLoginRegister = () => {
  const main = document.getElementById("main");
  main.innerHTML = `
    <div class="auth-container">
      <div class="tabs">
        <button id="tabLogin" class="active">Iniciar sesión</button>
        <button id="tabRegister">Registrarse</button>
      </div>

      <form id="formLogin" class="auth-form visible">
        <h2>Login</h2>
        <input type="text" id="loginNombre" placeholder="Nombre de usuario" required>
        <input type="password" id="loginPassword" placeholder="Contraseña" required>
        <button type="submit">Entrar</button>
      </form>

      <form id="formRegister" class="auth-form">
        <h2>Registro</h2>
        <input type="text" id="registerNombre" placeholder="Nuevo usuario" required>
        <input type="password" id="registerPassword" placeholder="Contraseña" required>
        <input type="url" id="registerImagen" placeholder="URL de imagen (opcional)">
        <button type="submit">Registrarse</button>
      </form>
    </div>
  `;

  // Tabs
  document.getElementById("tabLogin").addEventListener("click", () => toggleTabs("login"));
  document.getElementById("tabRegister").addEventListener("click", () => toggleTabs("register"));

  // Eventos login
  document.getElementById("formLogin").addEventListener("submit", async (e) => {
    e.preventDefault();
    const nombre = document.getElementById("loginNombre").value.trim();
    const password = document.getElementById("loginPassword").value;

    try {
      const { data: usuarios } = await axios.get(ENDPOINTS.usuarios);
      const user = usuarios.find(u => u.nombre === nombre && u.password === password);

      if (!user) {
        alert("❌ Usuario o contraseña incorrecta.");
        return;
      }

      localStorage.setItem(STORAGE_KEYS.userId, user._id);
      location.reload(); // o llamá a UserUI
    } catch (err) {
      alert("❌ Error al iniciar sesión.");
      console.error(err);
    }
  });

  // Eventos registro
  document.getElementById("formRegister").addEventListener("submit", async (e) => {
    e.preventDefault();
    const nombre = document.getElementById("registerNombre").value.trim();
    const password = document.getElementById("registerPassword").value;
    const imagen = document.getElementById("registerImagen").value;

    try {
      const nuevo = {
        nombre,
        password,
        imagen,
        disponible: true
      };

      const { data } = await axios.post(ENDPOINTS.usuarios, nuevo);
      localStorage.setItem(STORAGE_KEYS.userId, data._id);
      location.reload(); // o llamá a UserUI
    } catch (err) {
      alert("❌ No se pudo registrar.");
      console.error(err);
    }
  });
};

const toggleTabs = (modo) => {
  document.getElementById("tabLogin").classList.toggle("active", modo === "login");
  document.getElementById("tabRegister").classList.toggle("active", modo === "register");
  document.getElementById("formLogin").classList.toggle("visible", modo === "login");
  document.getElementById("formRegister").classList.toggle("visible", modo === "register");
};
