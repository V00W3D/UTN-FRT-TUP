import {
  crearAuditoria,
  editarAuditoria,
  eliminarAuditoria,
  obtenerAuditoria,
} from "../services/auditoria.services";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

export const useAuditoria = () => {
  // const navigate = useNavigate()
  const [audiorias, setAuditorias] = useState([]);

  const fetchAuditorias = async () => {
    try {
      const data = await obtenerAuditoria();
      setAuditorias(data);
    } catch (error) {
      console.error("Error");
    }
  };

  useEffect(() => {
    fetchAuditorias();
  }, []);

  //Esta ruta, no es funcional, no lleva a ningun formulario que permita registrar una nueva auditoria
  const registroAuditoria = async (body) => {
    try {
      const nuevaAuditoria = await crearAuditoria(body);
      setAuditorias([...audiorias, nuevaAuditoria]);
    } catch (error) {
      console.error("Error");
    }
  };

  const modificarAuditoria = async (id, bodyEditado) => {
    try {
      const auditoriaEditada = await editarAuditoria(id, bodyEditado);
      setAuditorias(
        audiorias.map((aud) => (aud.id === id ? auditoriaEditada : lib))
      );
    } catch (error) {
      console.error("Error");
    }
  };

  const eliminacionAuditoria = async (id) => {
    try {
      await eliminarAuditoria(id);
      setAuditorias(audiorias.filter((aud) => aud.id !== id));
    } catch (error) {
      console.error("Error");
    }
  };

  return {
    audiorias,
    registroAuditoria,
    modificarAuditoria,
    eliminacionAuditoria,
  };
};
