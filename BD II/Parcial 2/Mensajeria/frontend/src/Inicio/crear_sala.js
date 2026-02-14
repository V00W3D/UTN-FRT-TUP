import { ENDPOINTS} from "../config.js";

export const renderCrearSala = (userId) => {
  const main = document.getElementById("main");
  main.innerHTML = `
    <div class="crear-sala">
      <h2>🎯 Crear nueva sala</h2>
      <form id="formCrearSala">
        <input type="text" id="nombreSala" placeholder="Nombre de la sala" required>
        <input type="number" id="maxParticipantes" min="2" max="99" placeholder="Máximo de participantes" required>
        <select id="tipoSala">
          <option value="publica">Pública</option>
          <option value="privada">Privada</option>
        </select>
        <input type="password" id="passwordSala" placeholder="Contraseña (solo si es privada)" style="display:none;">
        <button type="submit">Crear</button>
      </form>
    </div>
  `;

  const tipoSala = document.getElementById("tipoSala");
  const passwordInput = document.getElementById("passwordSala");

  tipoSala.addEventListener("change", () => {
    passwordInput.style.display = tipoSala.value === "privada" ? "block" : "none";
  });

  document.getElementById("formCrearSala").addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombreSala").value.trim();
    const maxParticipantes = parseInt(document.getElementById("maxParticipantes").value);
    const tipo = document.getElementById("tipoSala").value;
    const password = passwordInput.value.trim();

    try {
      const nueva = {
        nombre,
        maxParticipantes,
        tipo,
        password: tipo === "privada" ? password : "",
        owner: userId,
        participantes: [userId]
      };

      await axios.post(`${ENDPOINTS.salas}/add`, nueva);
      alert("✅ Sala creada correctamente");
      location.reload(); 
    } catch (err) {
      alert("❌ No se pudo crear la sala.");
      console.error(err);
    }
  });
};
