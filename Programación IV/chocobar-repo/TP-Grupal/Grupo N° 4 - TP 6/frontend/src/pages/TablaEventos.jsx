import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Header from "../components/Header";
import {
  getEventos,
  createEvento,
  updateEvento,
  deleteEvento,
} from "../services/eventosService";
import { getArtistas } from "../services/artistasService";
import { getAsistentes } from "../services/asistentesService";

const initialForm = { nombre: "", fecha: "", lugar: "", cupo: "" };

const TablaEventos = () => {
  const [eventos, setEventos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [artistas, setArtistas] = useState([]);
  const [asociarArtistasId, setAsociarArtistasId] = useState(null);
  const [selectedArtistas, setSelectedArtistas] = useState([]);
  const [asistentes, setAsistentes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dataEventos, dataArtistas, dataAsistentes] = await Promise.all([
          getEventos(),
          getArtistas(),
          getAsistentes(),
        ]);
        setEventos(dataEventos);
        setArtistas(dataArtistas);
        setAsistentes(dataAsistentes);
      } catch (error) {
        console.error("Error al cargar datos:", error);
        alert("No se pudieron cargar los datos iniciales de eventos");
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.fecha || !form.lugar || !form.cupo) return;

    const payload = {
      nombre: form.nombre,
      fecha: form.fecha,
      lugar: form.lugar,
      cupo: Number(form.cupo),
      artistas: [],
    };

    try {
      if (editandoId !== null) {
        const eventoActual = eventos.find((ev) => ev.id === editandoId);
        const actualizado = await updateEvento(editandoId, {
          ...payload,
          artistas: eventoActual?.artistas ?? [],
        });
        setEventos(eventos.map((ev) => (ev.id === editandoId ? actualizado : ev)));
      } else {
        const creado = await createEvento(payload);
        setEventos([...eventos, creado]);
      }
      setForm(initialForm);
      setEditandoId(null);
    } catch (error) {
      console.error("Error al guardar evento:", error);
      alert(error.message || "Ocurrió un error al guardar el evento");
    }
  };

  const handleEdit = (id) => {
    const evento = eventos.find((e) => e.id === id);
    if (!evento) return;
    setForm({
      nombre: evento.nombre,
      fecha: evento.fecha,
      lugar: evento.lugar,
      cupo: evento.cupo,
    });
    setEditandoId(id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que querés eliminar este evento?")) return;
    try {
      await deleteEvento(id);
      setEventos(eventos.filter((e) => e.id !== id));
    } catch (error) {
      console.error("Error al eliminar evento:", error);
      alert(error.message || "No se pudo eliminar el evento");
    }
  };

  const handleAsociar = (eventoId) => {
    setAsociarArtistasId(eventoId);
    const evento = eventos.find((e) => e.id === eventoId);
    setSelectedArtistas(evento?.artistas ?? []);
  };

  const toggleArtista = (artistaId) => {
    setSelectedArtistas((prev) =>
      prev.includes(artistaId)
        ? prev.filter((id) => id !== artistaId)
        : [...prev, artistaId]
    );
  };

  const guardarArtistas = async () => {
    if (asociarArtistasId === null) return;
    const evento = eventos.find((e) => e.id === asociarArtistasId);
    if (!evento) return;

    try {
      const actualizado = await updateEvento(asociarArtistasId, {
        ...evento,
        artistas: selectedArtistas,
      });
      setEventos(eventos.map((ev) => (ev.id === asociarArtistasId ? actualizado : ev)));
      setAsociarArtistasId(null);
    } catch (error) {
      console.error("Error al asociar artistas:", error);
      alert(error.message || "No se pudieron asociar los artistas");
    }
  };

  const cuposOcupados = (eventoId) =>
    asistentes.filter((a) => Number(a.eventoId) === Number(eventoId)).length;

  return (
    <div>
      <Header />

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
          marginTop: "100px",
        }}
      >
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="fecha"
          value={form.fecha}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lugar"
          placeholder="Lugar"
          value={form.lugar}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="cupo"
          placeholder="Cupo total"
          value={form.cupo}
          onChange={handleChange}
          min="0"
          required
        />
        <button type="submit">
          {editandoId ? "Guardar Cambios" : "Agregar Evento"}
        </button>
      </form>

      <Table bordered hover className="tabla w-75 mx-auto">
        <thead className="table-primary">
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Lugar</th>
            <th>Cupo Total</th>
            <th>Ocupado</th>
            <th>Disponible</th>
            <th>Artistas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {eventos.map((evento) => {
            const ocupados = cuposOcupados(evento.id);
            const disponible = Math.max(evento.cupo - ocupados, 0);
            const nombresArtistas = evento.artistas?.length
              ? artistas
                  .filter((a) => evento.artistas.includes(a.id))
                  .map((a) => a.nombre)
                  .join(", ")
              : "—";

            return (
              <tr key={evento.id}>
                <td>{evento.id}</td>
                <td>{evento.nombre}</td>
                <td>{evento.fecha}</td>
                <td>{evento.lugar}</td>
                <td>{evento.cupo}</td>
                <td>{ocupados}</td>
                <td>{disponible}</td>
                <td>{nombresArtistas}</td>
                <td className="d-flex gap-2">
                  <Button variant="primary" onClick={() => handleEdit(evento.id)}>
                    Editar
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(evento.id)}>
                    Eliminar
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => handleAsociar(evento.id)}
                  >
                    Asociar Artistas
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {asociarArtistasId && (
        <div
          style={{
            width: "50%",
            margin: "20px auto",
            padding: "10px",
            border: "1px solid #ccc",
          }}
        >
          <h5>Seleccionar artistas para el evento</h5>
          {artistas.map((artista) => (
            <div key={artista.id}>
              <input
                type="checkbox"
                checked={selectedArtistas.includes(artista.id)}
                onChange={() => toggleArtista(artista.id)}
              />
              {" "}
              {artista.nombre} ({artista.tipo})
            </div>
          ))}
          <div style={{ marginTop: "10px" }}>
            <Button variant="success" onClick={guardarArtistas}>
              Guardar
            </Button>
            <Button
              variant="secondary"
              style={{ marginLeft: "10px" }}
              onClick={() => setAsociarArtistasId(null)}
            >
              Cancelar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TablaEventos;
