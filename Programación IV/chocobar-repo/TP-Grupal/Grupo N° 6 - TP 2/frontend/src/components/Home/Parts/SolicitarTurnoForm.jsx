import { useEffect, useState } from "react";
import AuthFieldBuilder from "../../../common/FormBuilder/AuthFieldBuilder";
import AuthButton from "../../../common/FormBuilder/AuthButton";
import { useTurnos } from "../../../hooks/useTurnos";
import api from "../../../api";
import "../../../Styles/TurnosForm.css";

export default function SolicitarTurno() {
  const { crearTurno, isLoading, isSuccess, errorMessage } = useTurnos();

  const [fecha, setFecha] = useState("");
  const [especialidades, setEspecialidades] = useState([]);
  const [profesionales, setProfesionales] = useState([]);
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState("");
  const [profesionalSeleccionado, setProfesionalSeleccionado] = useState("");

  // 📥 Cargar especialidades
  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const res = await api.get("/especialidades");
        if (res.data.ok) setEspecialidades(res.data.data);
      } catch (err) {
        console.error("[SolicitarTurno] Error cargando especialidades:", err);
      }
    };
    fetchEspecialidades();
  }, []);

  // 📥 Cargar profesionales al seleccionar especialidad
  useEffect(() => {
    const fetchProfesionales = async () => {
      if (!especialidadSeleccionada) return;
      try {
        const res = await api.get(
          `/profesionales?especialidad=${especialidadSeleccionada}`
        );
        if (res.data.ok) setProfesionales(res.data.data);
      } catch (err) {
        console.error("[SolicitarTurno] Error cargando profesionales:", err);
      }
    };
    fetchProfesionales();
  }, [especialidadSeleccionada]);

  // 🧾 Crear turno
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fecha || !especialidadSeleccionada || !profesionalSeleccionado) {
      alert("Por favor completa todos los campos.");
      return;
    }

    const turno = {
      Fecha: fecha,
      EspecialidadID: especialidadSeleccionada,
      ProfesionalID: profesionalSeleccionado,
    };

    const res = await crearTurno(turno);
    if (res.ok) {
      alert("✅ Turno registrado correctamente");
      setFecha("");
      setEspecialidadSeleccionada("");
      setProfesionalSeleccionado("");
    } else {
      alert("❌ " + res.message);
    }
  };

  return (
    <div className="turno-form-container">
      <h2>🩺 Solicitar un Turno</h2>
      <p>Seleccioná la especialidad, el profesional y la fecha deseada.</p>

      <form onSubmit={handleSubmit} className="turno-form">
        {/* 📅 Fecha */}
        <AuthFieldBuilder
          id="fecha"
          type="datetime-local"
          value={fecha}
          label="Fecha y hora"
          onChange={(e) => setFecha(e.target.value)}
        />

        {/* 🩻 Especialidad */}
        <AuthFieldBuilder
          id="especialidad"
          label=""
          value={especialidadSeleccionada}
          onChange={(e) => setEspecialidadSeleccionada(e.target.value)}
          options={especialidades.map((esp) => ({
            value: esp.EspecialidadID,
            label: esp.Nombre,
          }))}
        />

        {/* 👨‍⚕️ Profesional */}
        <AuthFieldBuilder
          id="profesional"
          label=""
          value={profesionalSeleccionado}
          onChange={(e) => setProfesionalSeleccionado(e.target.value)}
          options={profesionales.map((pro) => ({
            value: pro.UserID,
            label: pro.Nombre,
          }))}
          disabled={!especialidadSeleccionada}
        />

        <AuthButton
          type="submit"
          text={isLoading ? "Solicitando..." : "Solicitar turno"}
          loading={isLoading}
        />
      </form>

      {isSuccess && (
        <p className="success-msg">Turno solicitado con éxito 🎉</p>
      )}
      {errorMessage && <p className="error-msg">{errorMessage}</p>}
    </div>
  );
}
