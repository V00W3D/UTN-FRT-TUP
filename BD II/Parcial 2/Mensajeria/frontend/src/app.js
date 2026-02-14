import { STORAGE_KEYS } from "./config.js";
import { mostrarLoginRegister } from "./Inicio/auth.js";
import { renderUsuario } from "./Inicio/UserUI.js";
import { inicializarDashboardSalas } from "./Inicio/sala_dashboard.js";

document.addEventListener("DOMContentLoaded", async () => {
  const userId = localStorage.getItem(STORAGE_KEYS.userId);

  if (!userId) {
    mostrarLoginRegister();
    return;
  }

  await renderUsuario(userId);
  inicializarDashboardSalas(userId);
});
