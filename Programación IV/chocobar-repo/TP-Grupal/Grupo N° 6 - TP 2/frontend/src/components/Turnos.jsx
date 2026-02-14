import { useState } from 'react';
import TarjetaEstadistica from '../dashboard/TarjetaEstadistica';
import '../Styles/Turnos.css';

export default function TurnosPage() {
  const [turnos, setTurnos] = useState([]);
  const [nuevoTurno, setNuevoTurno] = useState({
    paciente: '',
    fecha: '',
    hora: '',
    especialidad: '',
  });

  const [filtroDia, setFiltroDia] = useState('');
  const [filtroPaciente, setFiltroPaciente] = useState('');
  const [modoEdicion, setModoEdicion] = useState(null);

  // Agregar turno evitando superposición
  const agregarTurno = () => {
    const existe = turnos.some(
      (t) => t.fecha === nuevoTurno.fecha && t.hora === nuevoTurno.hora
    );
    if (existe) {
      alert('Ya hay un turno en ese horario');
      return;
    }
    setTurnos([...turnos, nuevoTurno]);
    setNuevoTurno({ paciente: '', fecha: '', hora: '', especialidad: '' });
  };

  // Eliminar turno
  const eliminarTurno = (index) => {
    const nuevosTurnos = turnos.filter((_, i) => i !== index);
    setTurnos(nuevosTurnos);
  };

  // Editar turno (activar modo edición)
  const editarTurno = (index) => {
    setNuevoTurno(turnos[index]);
    setModoEdicion(index);
  };

  // Guardar edición
  const guardarEdicion = () => {
    const actualizados = [...turnos];
    actualizados[modoEdicion] = nuevoTurno;
    setTurnos(actualizados);
    setModoEdicion(null);
    setNuevoTurno({ paciente: '', fecha: '', hora: '', especialidad: '' });
  };

  // Consultar turnos
  const turnosFiltrados = turnos.filter((t) => {
    if (filtroDia && t.fecha !== filtroDia) return false;
    if (filtroPaciente && !t.paciente.toLowerCase().includes(filtroPaciente.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="turnos-container">
      <h1>Gestión de Turnos</h1>

      {/* Formulario de turno */}
      <div className="turnos-form">
        <input
          type="text"
          placeholder="Paciente"
          maxLength={30}
          value={nuevoTurno.paciente}
          onChange={(e) => setNuevoTurno({ ...nuevoTurno, paciente: e.target.value })}
        />
        <input
          type="date"
          value={nuevoTurno.fecha}
          onChange={(e) => setNuevoTurno({ ...nuevoTurno, fecha: e.target.value })}
        />
        <input
          type="time"
          value={nuevoTurno.hora}
          onChange={(e) => setNuevoTurno({ ...nuevoTurno, hora: e.target.value })}
        />
        <input
          type="text"
          placeholder="Especialidad"
          maxLength={20}
          value={nuevoTurno.especialidad}
          onChange={(e) => setNuevoTurno({ ...nuevoTurno, especialidad: e.target.value })}
        />
        {modoEdicion !== null ? (
          <button onClick={guardarEdicion}>Guardar cambios</button>
        ) : (
          <button onClick={agregarTurno}>Agregar Turno</button>
        )}
      </div>

      {/* Consultar por filtros */}
      <div className="turnos-filtros">
        <h3>Consultar Turnos</h3>
        <input
          type="date"
          value={filtroDia}
          onChange={(e) => setFiltroDia(e.target.value)}
        />
        <input
          type="text"
          placeholder="Buscar por paciente"
          value={filtroPaciente}
          onChange={(e) => setFiltroPaciente(e.target.value)}
        />
        <button onClick={() => { setFiltroDia(''); setFiltroPaciente(''); }}>
          Limpiar filtros
        </button>
      </div>

      {/* Lista de turnos */}
      <h2>Turnos Registrados</h2>
      <ul className="turnos-list">
        {turnosFiltrados.length === 0 ? (
          <li>No hay turnos disponibles</li>
        ) : (
          turnosFiltrados.map((t, index) => (
            <li key={index}>
              <strong>{t.paciente}</strong> — {t.fecha} {t.hora} — {t.especialidad}
              <div className="turnos-botones">
                <button onClick={() => editarTurno(index)}>Editar</button>
                <button onClick={() => eliminarTurno(index)}>Eliminar</button>
              </div>
            </li>
          ))
        )}
      </ul>

      {/* Tarjeta estadística */}
      <div className="tarjeta-estadistica">
        <TarjetaEstadistica titulo="Cantidad de turnos" valor={turnos.length} />
      </div>
    </div>
  );
}
