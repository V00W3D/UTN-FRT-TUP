import { useState } from "react";
import { TurnosService } from "../services/TurnosServices";

export const useTurnos = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [turnos, setTurnos] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

  // 📅 Crear turno
  const crearTurno = async (data) => {
    setIsLoading(true);
    setIsError(false);
    setErrorMessage("");
    try {
      const res = await TurnosService.crearTurno(data);
      if (res.ok) {
        setIsSuccess(true);
        await consultarTurnos(); // refresca lista
      } else {
        setIsError(true);
        setErrorMessage(res.message);
      }
      return res;
    } catch (err) {
      console.error("[useTurnos] crearTurno:", err);
      setIsError(true);
      setErrorMessage("Error al crear turno");
    } finally {
      setIsLoading(false);
    }
  };

  // ❌ Cancelar turno
  const cancelarTurno = async (TurnoID) => {
    setIsLoading(true);
    try {
      const res = await TurnosService.cancelarTurno(TurnoID);
      if (res.ok) {
        setTurnos((prev) => prev.filter((t) => t.TurnoID !== TurnoID));
      } else {
        setIsError(true);
        setErrorMessage(res.message);
      }
      return res;
    } catch (err) {
      console.error("[useTurnos] cancelarTurno:", err);
      setIsError(true);
      setErrorMessage("Error al cancelar turno");
    } finally {
      setIsLoading(false);
    }
  };

  // 🔍 Consultar turnos
  const consultarTurnos = async (filtros = {}) => {
    setIsLoading(true);
    setIsError(false);
    setErrorMessage("");
    try {
      const res = await TurnosService.consultarTurnos(filtros);
      if (res.ok) {
        setTurnos(res.data || []);
        setIsSuccess(true);
      } else {
        setIsError(true);
        setErrorMessage(res.message);
      }
    } catch (err) {
      console.error("[useTurnos] consultarTurnos:", err);
      setIsError(true);
      setErrorMessage("Error al consultar turnos");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    turnos,
    isLoading,
    isError,
    isSuccess,
    errorMessage,
    crearTurno,
    cancelarTurno,
    consultarTurnos,
  };
};
