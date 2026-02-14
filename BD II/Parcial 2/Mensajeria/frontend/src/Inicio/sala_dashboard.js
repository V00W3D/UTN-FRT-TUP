import { ENDPOINTS, STORAGE_KEYS } from "../config.js";
import { renderCrearSala } from "./crear_sala.js";

export const inicializarDashboardSalas = async (userId) => {
  const main = document.getElementById("main");
  main.innerHTML = "";

  const contenedor = document.createElement("div");
  contenedor.className = "dashboard-salas";

  const btnVerificar = document.createElement("button");
  btnVerificar.textContent = "crear sala";
  btnVerificar.addEventListener("click", async () => {
    try {
      const { data: salas } = await axios.get(ENDPOINTS.salas);
      const propias = salas.filter(s => s.owner === userId);
      if (propias.length === 0) {
        renderCrearSala(userId);
      } else {
        alert(`📌 Ya tenés ${propias.length} sala(s) creadas.`);
      }
    } catch (err) {
      console.error("❌ No se pudieron verificar salas:", err);
    }
  });

  contenedor.appendChild(btnVerificar);

  const buscadorForm = document.createElement("form");
  buscadorForm.id = "formBuscarSala";
  buscadorForm.innerHTML = `
    <label for="buscarSala">Buscar sala por nombre:</label>
    <input type="text" id="buscarSala" placeholder="Ej: Grupo 3" required>
    <button type="submit">Buscar</button>
  `;

  buscadorForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const valor = document.getElementById("buscarSala").value.trim().toLowerCase();
    if (!valor) return;

    try {
      const { data: salas } = await axios.get(ENDPOINTS.salas);
      const resultados = salas.filter(sala =>
        sala.nombre.toLowerCase().includes(valor)
      );

      renderTablaSalas(resultados, "Resultados de búsqueda", userId, true);
    } catch (err) {
      alert("❌ No se pudo buscar salas.");
      console.error(err);
    }
  });

  const btnGrupo = document.createElement("div");
  btnGrupo.className = "btn-grupo";

  const btnTodas = document.createElement("button");
  btnTodas.textContent = "🔓 Ver todas las salas";
  btnTodas.addEventListener("click", () => mostrarSalas("todas", userId));

  const btnPropias = document.createElement("button");
  btnPropias.textContent = "🛠️ Ver mis salas";
  btnPropias.addEventListener("click", () => mostrarSalas("propias", userId));

  btnGrupo.appendChild(btnTodas);
  btnGrupo.appendChild(btnPropias);

  const tablaRender = document.createElement("div");
  tablaRender.id = "resultado-salas";

  contenedor.appendChild(buscadorForm);
  contenedor.appendChild(btnGrupo);
  contenedor.appendChild(tablaRender);
  main.appendChild(contenedor);
};

const mostrarSalas = async (modo, userId) => {
  const render = document.getElementById("resultado-salas");
  render.innerHTML = "";

  try {
    const { data: salas } = await axios.get(ENDPOINTS.salas);

    const filtradas = modo === "propias"
      ? salas.filter(s => s.owner === userId)
      : salas;

    renderTablaSalas(
      filtradas,
      modo === "propias" ? "Mis salas" : "Salas públicas",
      userId,
      modo === "propias"
    );
  } catch (err) {
    render.innerHTML = "<p>⚠️ No se pudieron cargar las salas.</p>";
    console.error(err);
  }
};

const renderTablaSalas = (salas, titulo, userId, editable = false) => {
  const render = document.getElementById("resultado-salas");
  render.innerHTML = "";

  if (salas.length === 0) {
    render.innerHTML = "<p>📭 No hay salas disponibles.</p>";
    return;
  }

  const title = document.createElement("h2");
  title.textContent = titulo;

  const table = document.createElement("table");
  table.className = "tabla-salas";

  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
      <th>Nombre</th>
      <th>Tipo</th>
      <th>Participantes</th>
      <th>Máximo</th>
      <th>Creador</th>
      ${editable ? "<th>Acciones</th>" : "<th>Acción</th>"}
    </tr>
  `;


  const tbody = document.createElement("tbody");
  salas.forEach(sala => {
    const tr = document.createElement("tr");
    const owner = sala.owner;
    const tdOwner = document.createElement("td");
    tdOwner.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px;">
        <img src="${owner?.imagen || './img/default.png'}" style="width: 32px; height: 32px; border-radius: 50%;" />
        <span>${owner?.nombre || "Sin nombre"}</span>
      </div>
    `;

    tr.innerHTML = `
      <td>${sala.nombre}</td>
      <td>${sala.tipo}</td>
      <td>${sala.participantes.length}</td>
      <td>${sala.maxParticipantes}</td>
    `;

    const tdFinal = document.createElement("td");

    if (editable) {
      tdFinal.innerHTML = `
        <button onclick="editarSala('${sala._id}')">✏️</button>
        <button onclick="eliminarSala('${sala._id}')">🗑️</button>
      `;
    } else {
      if (sala.tipo === "publica") {
        const btnUnirse = document.createElement("button");
        btnUnirse.textContent = "Unirse";
        btnUnirse.addEventListener("click", () => {
          localStorage.setItem("salaId", sala._id);
          location.href = "./chat.html";
        });
        tdFinal.appendChild(btnUnirse);
      } else {
        const btnSolicitar = document.createElement("button");
        btnSolicitar.textContent = "Solicitar unirse";
        btnSolicitar.addEventListener("click", () => {
          const pass = prompt("🔐 Ingresá la contraseña de la sala:");
          if (pass === sala.password) {
            localStorage.setItem("salaId", sala._id);
            location.href = "./chat.html";
          } else {
            alert("❌ Contraseña incorrecta.");
          }
        });
        tdFinal.appendChild(btnSolicitar);
      }
    }
    tr.appendChild(tdOwner);
    tr.appendChild(tdFinal);
    tbody.appendChild(tr);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  render.appendChild(title);
  render.appendChild(table);
};

window.editarSala = async (id) => {
  const { data: sala } = await axios.get(`${ENDPOINTS.salas}/${id}`);

  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-content">
      <h3>Editar sala</h3>
      <label>Nombre:</label>
      <input type="text" id="edit-nombre" value="${sala.nombre}">
      <label>Máximo de participantes:</label>
      <input type="number" id="edit-max" value="${sala.maxParticipantes}">
      <label>Tipo:</label>
      <select id="edit-tipo">
        <option value="publica" ${sala.tipo === "publica" ? "selected" : ""}>Pública</option>
        <option value="privada" ${sala.tipo === "privada" ? "selected" : ""}>Privada</option>
      </select>
      <label>Contraseña:</label>
      <input type="text" id="edit-password" value="${sala.password || ""}">
      <br/>
      <button id="confirmarEdit">Guardar</button>
      <button id="cancelarEdit">Cancelar</button>
    </div>
  `;

  document.body.appendChild(modal);

  document.getElementById("cancelarEdit").addEventListener("click", () => {
    document.body.removeChild(modal);
  });

  document.getElementById("confirmarEdit").addEventListener("click", async () => {
    const nuevaSala = {
      nombre: document.getElementById("edit-nombre").value.trim(),
      maxParticipantes: parseInt(document.getElementById("edit-max").value),
      tipo: document.getElementById("edit-tipo").value,
      password: document.getElementById("edit-password").value
    };

    try {
      await axios.put(`${ENDPOINTS.salas}/${id}`, nuevaSala);
      alert("✅ Sala actualizada");
      document.body.removeChild(modal);
      mostrarSalas("propias", localStorage.getItem(STORAGE_KEYS.userId));
    } catch (err) {
      alert("❌ Error al editar sala");
      console.error(err);
    }
  });
};
