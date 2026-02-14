import { useState, useEffect } from 'react';
import Tarjeta from '../components/Tarjeta';
import '../Styles/Medicos.css';

export default function Medicos() {
  const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
  const claveStorage = `medicos_${usuarioActual}`;

  const [nombre, setNombre] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  // Cargar médicos guardados de este usuario
  const [medicos, setMedicos] = useState(() => {
    return JSON.parse(localStorage.getItem(claveStorage)) || [];
  });

  // Guardar automáticamente en localStorage cuando cambien los médicos
  useEffect(() => {
    localStorage.setItem(claveStorage, JSON.stringify(medicos));
  }, [medicos]);

  const handleAgregar = (e) => {
    e.preventDefault();

    if (!nombre || !especialidad) {
      alert('Completa todos los campos');
      return;
    }

    if (editIndex !== null) {
      const nuevosMedicos = [...medicos];
      nuevosMedicos[editIndex] = { nombre, especialidad };
      setMedicos(nuevosMedicos);
      setEditIndex(null);
    } else {
      const nuevoMedico = { nombre, especialidad };
      setMedicos([...medicos, nuevoMedico]);
    }

    setNombre('');
    setEspecialidad('');
  };

  const handleEditar = (index) => {
    setEditIndex(index);
    setNombre(medicos[index].nombre);
    setEspecialidad(medicos[index].especialidad);
  };

  const handleBorrar = (index) => {
    if (confirm('¿Deseas eliminar este médico?')) {
      const nuevosMedicos = medicos.filter((_, i) => i !== index);
      setMedicos(nuevosMedicos);
    }
  };

  // Filtro de búsqueda
  const medicosFiltrados = medicos.filter((m) =>
    m.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    m.especialidad.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="medicos-container">
      <h2>Médicos</h2>

      <form onSubmit={handleAgregar} className="medicos-form">
        <label>Nombre</label>
        <input
          type="text"
          value={nombre}
          maxLength={30}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del médico"
        />

        <label>Especialidad</label>
        <input
          type="text"
          value={especialidad}
          maxLength={20}
          onChange={(e) => setEspecialidad(e.target.value)}
          placeholder="Especialidad"
        />

        <button type="submit">
          {editIndex !== null ? 'Guardar Cambios' : 'Agregar Médico'}
        </button>
      </form>

      <div className="busqueda-container">
        <input
          type="text"
          placeholder="Buscar médico por nombre o especialidad..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="medicos-tarjetas">
        {medicosFiltrados.length > 0 ? (
          medicosFiltrados.map((m, i) => (
            <div key={i} className="tarjeta-medico">
              <Tarjeta titulo={m.nombre} contenido={`Especialidad: ${m.especialidad}`} />
              <div className="acciones">
                <button onClick={() => handleEditar(i)}>✏️ Editar</button>
                <button onClick={() => handleBorrar(i)}>🗑️ Borrar</button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay médicos que coincidan con la búsqueda.</p>
        )}
      </div>
    </div>
  );
}
