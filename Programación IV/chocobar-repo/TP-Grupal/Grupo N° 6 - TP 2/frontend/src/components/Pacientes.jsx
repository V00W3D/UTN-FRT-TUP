import { useState, useEffect } from 'react';
import Tarjeta from '../components/Tarjeta';
import '../Styles/Pacientes.css';

export default function Pacientes() {
  const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
  const claveStorage = `pacientes_${usuarioActual}`;

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  // Cargar pacientes guardados de este usuario
  const [pacientes, setPacientes] = useState(() => {
    return JSON.parse(localStorage.getItem(claveStorage)) || [];
  });

  // Guardar automáticamente en localStorage cuando cambian los pacientes
  useEffect(() => {
    localStorage.setItem(claveStorage, JSON.stringify(pacientes));
  }, [pacientes]);

  const handleAgregar = (e) => {
    e.preventDefault();

    if (!nombre || !email) {
      alert('Completa todos los campos');
      return;
    }

    if (editIndex !== null) {
      const nuevosPacientes = [...pacientes];
      nuevosPacientes[editIndex] = { nombre, email };
      setPacientes(nuevosPacientes);
      setEditIndex(null);
    } else {
      const nuevoPaciente = { nombre, email };
      setPacientes([...pacientes, nuevoPaciente]);
    }

    setNombre('');
    setEmail('');
  };

  const handleEditar = (index) => {
    setEditIndex(index);
    setNombre(pacientes[index].nombre);
    setEmail(pacientes[index].email);
  };

  const handleBorrar = (index) => {
    if (confirm('¿Deseas eliminar este paciente?')) {
      const nuevosPacientes = pacientes.filter((_, i) => i !== index);
      setPacientes(nuevosPacientes);
    }
  };

  // Filtro de búsqueda
  const pacientesFiltrados = pacientes.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="pacientes-container">
      <h2>Pacientes</h2>

      <form onSubmit={handleAgregar} className="pacientes-form">
        <label>Nombre</label>
        <input
          type="text"
          value={nombre}
          maxLength={30}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del paciente"
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          maxLength={32}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
        />

        <button type="submit">
          {editIndex !== null ? 'Guardar Cambios' : 'Agregar Paciente'}
        </button>
      </form>

      <div className="busqueda-container">
        <input
          type="text"
          placeholder="Buscar paciente por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="pacientes-tarjetas">
        {pacientesFiltrados.length > 0 ? (
          pacientesFiltrados.map((p, i) => (
            <div key={i} className="tarjeta-paciente">
              <Tarjeta titulo={p.nombre} contenido={`Email: ${p.email}`} />
              <div className="acciones">
                <button onClick={() => handleEditar(i)}>✏️ Editar</button>
                <button onClick={() => handleBorrar(i)}>🗑️ Borrar</button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay pacientes que coincidan con la búsqueda.</p>
        )}
      </div>
    </div>
  );
}
