import { useNavigate } from "react-router-dom";
import { useUserServices } from "../services/useUserServices";
import { useUserStore } from "../store/useUserStore";

/**
 * 🧍‍♂️ Hook para manejar acciones del usuario visitante/donante.
 * Interactúa con el store y los servicios.
 */
export function useUserHook() {
  const navigate = useNavigate();
  const {
    perfil,
    campañas,
    donaciones,
    ui,
    setPerfil,
    setCampañas,
    setDonaciones,
    setUI,
  } = useUserStore();

  /* =======================================================
     📄 PERFIL
  ======================================================= */
  const fetchProfile = async () => {
    setUI({ loading: true, error: null });
    try {
      const data = await useUserServices.getProfile();
      setPerfil(data);
      setUI({ loading: false });
      return data;
    } catch (err) {
      setUI({ loading: false, error: err.message });
      throw err;
    }
  };

  /* =======================================================
     🎁 CAMPAÑAS
  ======================================================= */
  const fetchCampañas = async () => {
    setUI({ loading: true, error: null });
    try {
      const data = await useUserServices.getCampañas();
      setCampañas(data);
      setUI({ loading: false });
      return data;
    } catch (err) {
      setUI({ loading: false, error: err.message });
      throw err;
    }
  };

  /* =======================================================
     💰 DONACIONES
  ======================================================= */
  const realizarDonacion = async (usuarioId, campañaId, formData) => {
    setUI({ loading: true, error: null });
    try {
      // formData: { producto, cantidad, tipo }
      const data = await useUserServices.donar(usuarioId, campañaId, formData);
      setUI({ loading: false });
      await fetchHistorial(usuarioId);
      return data;
    } catch (err) {
      setUI({ loading: false, error: err.message });
      throw err;
    }
  };

  const fetchHistorial = async (usuarioId) => {
    setUI({ loading: true, error: null });
    try {
      const data = await useUserServices.getHistorialDonaciones(usuarioId);
      setDonaciones(data);
      setUI({ loading: false });
      return data;
    } catch (err) {
      setUI({ loading: false, error: err.message });
      throw err;
    }
  };

  /* =======================================================
     ✉️ MENSAJES
  ======================================================= */
  const enviarMensaje = async (usuarioId, asunto, mensaje) => {
    setUI({ loading: true, error: null });
    try {
      const data = await useUserServices.enviarMensaje(
        usuarioId,
        asunto,
        mensaje
      );
      setUI({ loading: false });
      navigate("/gracias"); // Redirige a una pantalla tipo “Gracias por tu mensaje”
      return data;
    } catch (err) {
      setUI({ loading: false, error: err.message });
      throw err;
    }
  };

  /* =======================================================
     🧩 EXPORT
  ======================================================= */
  return {
    perfil,
    campañas,
    donaciones,
    loading: ui.loading,
    error: ui.error,

    fetchProfile,
    fetchCampañas,
    realizarDonacion,
    fetchHistorial,
    enviarMensaje,
  };
}
