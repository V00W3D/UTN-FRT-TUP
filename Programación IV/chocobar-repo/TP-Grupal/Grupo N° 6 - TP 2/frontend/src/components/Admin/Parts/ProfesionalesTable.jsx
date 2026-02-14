import { useEffect, useState } from "react";
import { TableBuilder } from "../../../common/TableBuilder";
import ModalBuilder from "../../../common/ModalBuilder";

export function ProfesionalesTable() {
  const [profesionales, setProfesionales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Datos del formulario
  const [nuevo, setNuevo] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    contraseña: "",
    especialidadID: "",
    imagen: "",
  });

  const [especialidades, setEspecialidades] = useState([]);

  /* =======================================================
     📦 Fetch: Profesionales + Especialidades
  ======================================================= */
  const fetchProfesionales = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/profesionales");
      const data = await res.json();
      if (data.ok) setProfesionales(data.data);
    } catch (err) {
      console.error("[Profesionales] Error al obtener lista:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchEspecialidades = async () => {
    try {
      const res = await fetch("http://localhost:8000/especialidades");
      const data = await res.json();
      if (data.ok) setEspecialidades(data.data);
    } catch (err) {
      console.error("[Profesionales] Error al obtener especialidades:", err);
    }
  };

  useEffect(() => {
    fetchProfesionales();
    fetchEspecialidades();
  }, []);

  /* =======================================================
     ➕ Agregar profesional
  ======================================================= */
  const handleAdd = async () => {
    const { nombre, correo, telefono, contraseña, especialidadID } = nuevo;
    if (!nombre || !correo || !telefono || !contraseña || !especialidadID)
      return alert("Completa todos los campos obligatorios.");

    try {
      const res = await fetch("http://localhost:8000/profesionales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...nuevo,
          especialidadID: Number(nuevo.especialidadID),
        }),
      });
      const data = await res.json();

      if (data.ok) {
        setNuevo({
          nombre: "",
          correo: "",
          telefono: "",
          contraseña: "",
          especialidadID: "",
          imagen: "",
        });
        setShowModal(false);
        fetchProfesionales();
      } else {
        alert(data.message || "Error al agregar profesional.");
      }
    } catch (err) {
      console.error("[Profesionales] Error al agregar profesional:", err);
    }
  };

  /* =======================================================
     🧱 Tabla base
  ======================================================= */
  const columns = [
    { key: "UserID", label: "ID" },
    { key: "Nombre", label: "Nombre" },
    { key: "Especialidad", label: "Especialidad" },
  ];

  const renderActions = () => (
    <>
      <button className="btn btn-sm btn-outline-secondary mx-1" disabled>
        Editar
      </button>
      <button className="btn btn-sm btn-outline-danger mx-1" disabled>
        Eliminar
      </button>
    </>
  );

  /* =======================================================
     🪟 Contenido del modal
  ======================================================= */
  const modalContent = (
    <div className="d-flex flex-column gap-3">
      <input
        type="text"
        className="form-control"
        placeholder="Nombre completo"
        value={nuevo.nombre}
        onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
      />
      <input
        type="email"
        className="form-control"
        placeholder="Correo electrónico"
        value={nuevo.correo}
        onChange={(e) => setNuevo({ ...nuevo, correo: e.target.value })}
      />
      <input
        type="tel"
        className="form-control"
        placeholder="Teléfono"
        value={nuevo.telefono}
        onChange={(e) => setNuevo({ ...nuevo, telefono: e.target.value })}
      />
      <input
        type="password"
        className="form-control"
        placeholder="Contraseña temporal"
        value={nuevo.contraseña}
        onChange={(e) => setNuevo({ ...nuevo, contraseña: e.target.value })}
      />
      <select
        className="form-select"
        value={nuevo.especialidadID}
        onChange={(e) =>
          setNuevo({ ...nuevo, especialidadID: Number(e.target.value) })
        }
      >
        <option value="">Seleccione especialidad</option>
        {especialidades.map((esp) => (
          <option key={esp.EspecialidadID} value={esp.EspecialidadID}>
            {esp.Nombre}
          </option>
        ))}
      </select>
      <input
        type="text"
        className="form-control"
        placeholder="URL de imagen (opcional)"
        value={nuevo.imagen}
        onChange={(e) => setNuevo({ ...nuevo, imagen: e.target.value })}
      />
    </div>
  );

  const modalActions = (
    <div className="d-flex justify-content-end gap-2">
      <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
        Cancelar
      </button>
      <button className="btn btn-primary" onClick={handleAdd}>
        Guardar
      </button>
    </div>
  );

  /* =======================================================
     🧩 Render principal
  ======================================================= */
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Listado de Profesionales</h4>
        <button className="sakura-btn" onClick={() => setShowModal(true)}>
          ➕ Añadir médico
        </button>
      </div>

      {loading ? (
        <p className="text-center text-muted mt-3">Cargando profesionales...</p>
      ) : (
        <TableBuilder
          columns={columns}
          data={profesionales}
          renderActions={renderActions}
          emptyMessage="No hay médicos registrados."
        />
      )}

      <ModalBuilder
        show={showModal}
        title="Registrar nuevo profesional"
        onClose={() => setShowModal(false)}
        actions={modalActions}
        width="500px"
      >
        {modalContent}
      </ModalBuilder>
    </div>
  );
}
