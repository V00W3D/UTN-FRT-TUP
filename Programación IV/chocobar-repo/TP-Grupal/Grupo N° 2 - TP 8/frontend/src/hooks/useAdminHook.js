import { useAdminStore } from "../store/useAdminStore";
import { useAdminServices } from "../services/useAdminServices";

/**
 * 🧑‍💼 Hook de administración
 * Maneja usuarios, beneficiarios, donaciones y entregas desde el panel admin.
 * Usa Zustand + localStorage + servicios REST.
 */
export function useAdminHook() {
  const {
    usuarios,
    beneficiarios,
    donaciones,
    entregas,
    ui,
    setUsuarios,
    setBeneficiarios,
    setDonaciones,
    setEntregas,
    setUI,
  } = useAdminStore();

  /* =======================================================
     👥 USUARIOS
  ======================================================= */
  const fetchUsuarios = async () => {
    setUI({ loading: true, error: null });
    try {
      // cache localStorage
      const cached = localStorage.getItem("admin_usuarios");
      if (cached) {
        setUsuarios(JSON.parse(cached));
        setUI({ loading: false });
        return JSON.parse(cached);
      }

      const data = await useAdminServices.getUsuarios();
      setUsuarios(data);
      localStorage.setItem("admin_usuarios", JSON.stringify(data));
      setUI({ loading: false });
      return data;
    } catch (err) {
      setUI({ loading: false, error: err.message });
      throw err;
    }
  };

  const crearUsuario = async (formData) => {
    setUI({ loading: true, error: null });
    try {
      const nuevo = await useAdminServices.createUsuario(formData);
      const updated = [...usuarios, nuevo];
      setUsuarios(updated);
      localStorage.setItem("admin_usuarios", JSON.stringify(updated));
      setUI({ loading: false });
      return nuevo;
    } catch (err) {
      setUI({ loading: false, error: err.message });
      throw err;
    }
  };

  const editarUsuario = async (id, formData) => {
    setUI({ loading: true, error: null });
    try {
      const actualizado = await useAdminServices.updateUsuario(id, formData);
      const updated = usuarios.map((u) => (u.id === id ? actualizado : u));
      setUsuarios(updated);
      localStorage.setItem("admin_usuarios", JSON.stringify(updated));
      setUI({ loading: false });
      return actualizado;
    } catch (err) {
      setUI({ loading: false, error: err.message });
      throw err;
    }
  };

  const eliminarUsuario = async (id) => {
    setUI({ loading: true, error: null });
    try {
      await useAdminServices.deleteUsuario(id);
      const updated = usuarios.filter((u) => u.id !== id);
      setUsuarios(updated);
      localStorage.setItem("admin_usuarios", JSON.stringify(updated));
      setUI({ loading: false });
      return true;
    } catch (err) {
      setUI({ loading: false, error: err.message });
      throw err;
    }
  };

  /* =======================================================
     🎁 DONACIONES
  ======================================================= */
  const fetchDonaciones = async () => {
    setUI({ loading: true, error: null });
    try {
      const cached = localStorage.getItem("admin_donaciones");
      if (cached) {
        setDonaciones(JSON.parse(cached));
        setUI({ loading: false });
        return JSON.parse(cached);
      }

      const data = await useAdminServices.getDonaciones();
      setDonaciones(data);
      localStorage.setItem("admin_donaciones", JSON.stringify(data));
      setUI({ loading: false });
      return data;
    } catch (err) {
      setUI({ loading: false, error: err.message });
      throw err;
    }
  };

  const aprobarDonacion = async (donacionId, beneficiarioId, responsableId) => {
    setUI({ loading: true, error: null });
    try {
      // Obtener la donación actual
      const donacion = donaciones.find((d) => d.id === donacionId);
      if (!donacion) throw new Error("Donación no encontrada");

      // Crear nueva entrega
      const entrega = await useAdminServices.createEntregaFromDonacion(
        donacion,
        beneficiarioId,
        responsableId
      );

      // Actualizar estado de donación a "entregado"
      const updatedDonacion = { ...donacion, estado: "entregado" };
      await useAdminServices.updateDonacion(donacionId, updatedDonacion);

      // Actualizar stores y caché local
      const updatedDonaciones = donaciones.map((d) =>
        d.id === donacionId ? updatedDonacion : d
      );
      const updatedEntregas = [...entregas, entrega];

      setDonaciones(updatedDonaciones);
      setEntregas(updatedEntregas);

      localStorage.setItem(
        "admin_donaciones",
        JSON.stringify(updatedDonaciones)
      );
      localStorage.setItem("admin_entregas", JSON.stringify(updatedEntregas));

      setUI({ loading: false });
      return entrega;
    } catch (err) {
      setUI({ loading: false, error: err.message });
      throw err;
    }
  };

  const cancelarDonacion = async (donacionId) => {
    setUI({ loading: true, error: null });
    try {
      const donacion = donaciones.find((d) => d.id === donacionId);
      if (!donacion) throw new Error("Donación no encontrada");

      const updatedDonacion = { ...donacion, estado: "cancelada" };
      await useAdminServices.updateDonacion(donacionId, updatedDonacion);

      const updatedDonaciones = donaciones.map((d) =>
        d.id === donacionId ? updatedDonacion : d
      );

      setDonaciones(updatedDonaciones);
      localStorage.setItem(
        "admin_donaciones",
        JSON.stringify(updatedDonaciones)
      );

      setUI({ loading: false });
      return updatedDonacion;
    } catch (err) {
      setUI({ loading: false, error: err.message });
      throw err;
    }
  };

  /* =======================================================
     🧍 BENEFICIARIOS
  ======================================================= */
  const fetchBeneficiarios = async () => {
    setUI({ loading: true, error: null });
    try {
      const cached = localStorage.getItem("admin_beneficiarios");
      if (cached) {
        setBeneficiarios(JSON.parse(cached));
        setUI({ loading: false });
        return JSON.parse(cached);
      }

      const data = await useAdminServices.getBeneficiarios();
      setBeneficiarios(data);
      localStorage.setItem("admin_beneficiarios", JSON.stringify(data));
      setUI({ loading: false });
      return data;
    } catch (err) {
      setUI({ loading: false, error: err.message });
      throw err;
    }
  };

  const crearBeneficiario = async (formData) => {
    setUI({ loading: true, error: null });
    try {
      const nuevo = await useAdminServices.createBeneficiario(formData);
      const updated = [...beneficiarios, nuevo];
      setBeneficiarios(updated);
      localStorage.setItem("admin_beneficiarios", JSON.stringify(updated));
      setUI({ loading: false });
      return nuevo;
    } catch (err) {
      setUI({ loading: false, error: err.message });
      throw err;
    }
  };

  const editarBeneficiario = async (id, formData) => {
    setUI({ loading: true, error: null });
    try {
      const actualizado = await useAdminServices.updateBeneficiario(
        id,
        formData
      );
      const updated = beneficiarios.map((b) => (b.id === id ? actualizado : b));
      setBeneficiarios(updated);
      localStorage.setItem("admin_beneficiarios", JSON.stringify(updated));
      setUI({ loading: false });
      return actualizado;
    } catch (err) {
      setUI({ loading: false, error: err.message });
      throw err;
    }
  };

  const eliminarBeneficiario = async (id) => {
    setUI({ loading: true, error: null });
    try {
      await useAdminServices.deleteBeneficiario(id);
      const updated = beneficiarios.filter((b) => b.id !== id);
      setBeneficiarios(updated);
      localStorage.setItem("admin_beneficiarios", JSON.stringify(updated));
      setUI({ loading: false });
      return true;
    } catch (err) {
      setUI({ loading: false, error: err.message });
      throw err;
    }
  };

  /* =======================================================
     📦 ENTREGAS
  ======================================================= */
  const fetchEntregas = async () => {
    setUI({ loading: true, error: null });
    try {
      const cached = localStorage.getItem("admin_entregas");
      if (cached) {
        setEntregas(JSON.parse(cached));
        setUI({ loading: false });
        return JSON.parse(cached);
      }

      const data = await useAdminServices.getEntregas();
      setEntregas(data);
      localStorage.setItem("admin_entregas", JSON.stringify(data));
      setUI({ loading: false });
      return data;
    } catch (err) {
      setUI({ loading: false, error: err.message });
      throw err;
    }
  };

  const confirmarEntrega = async (entregaId) => {
    setUI({ loading: true, error: null });
    try {
      const entrega = entregas.find((e) => e.id === entregaId);
      if (!entrega) throw new Error("Entrega no encontrada");

      const actualizada = { ...entrega, estado: "realizada", confirmada: true };
      await useAdminServices.updateEntrega(entregaId, actualizada);

      const updated = entregas.map((e) =>
        e.id === entregaId ? actualizada : e
      );

      setEntregas(updated);
      localStorage.setItem("admin_entregas", JSON.stringify(updated));
      setUI({ loading: false });
      return actualizada;
    } catch (err) {
      setUI({ loading: false, error: err.message });
      throw err;
    }
  };

  const marcarEntregaFallida = async (entregaId, comentario) => {
    setUI({ loading: true, error: null });
    try {
      const entrega = entregas.find((e) => e.id === entregaId);
      if (!entrega) throw new Error("Entrega no encontrada");

      const actualizada = {
        ...entrega,
        estado: "fallida",
        confirmada: false,
        comentario: comentario || "Entrega fallida sin detalles",
      };
      await useAdminServices.updateEntrega(entregaId, actualizada);

      const updated = entregas.map((e) =>
        e.id === entregaId ? actualizada : e
      );

      setEntregas(updated);
      localStorage.setItem("admin_entregas", JSON.stringify(updated));
      setUI({ loading: false });
      return actualizada;
    } catch (err) {
      setUI({ loading: false, error: err.message });
      throw err;
    }
  };

  /* =======================================================
     🧩 EXPORT
  ======================================================= */
  return {
    usuarios,
    donaciones,
    beneficiarios,
    entregas,
    loading: ui.loading,
    error: ui.error,

    fetchUsuarios,
    crearUsuario,
    editarUsuario,
    eliminarUsuario,

    fetchDonaciones,
    aprobarDonacion,
    cancelarDonacion,

    fetchBeneficiarios,
    crearBeneficiario,
    editarBeneficiario,
    eliminarBeneficiario,

    fetchEntregas,
    confirmarEntrega,
    marcarEntregaFallida,
  };
}
