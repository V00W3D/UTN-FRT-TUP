import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Header from "../components/Header";
import {
  getArtistas,
  createArtista,
  updateArtista,
  deleteArtista,
} from "../services/artistasService";

const initialForm = { nombre: "", tipo: "" };

const TablaArtistas = () => {
  const [artistas, setArtistas] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    const fetchArtistas = async () => {
      try {
        const data = await getArtistas();
        setArtistas(data);
      } catch (error) {
        console.error("Error al cargar artistas:", error);
        alert("No se pudieron cargar los artistas");
      }
    };
    fetchArtistas();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.tipo) return;

    try {
      if (editandoId !== null) {
        const actualizado = await updateArtista(editandoId, form);
        setArtistas(artistas.map((a) => (a.id === editandoId ? actualizado : a)));
      } else {
        const nuevo = await createArtista(form);
        setArtistas([...artistas, nuevo]);
      }
      setForm(initialForm);
      setEditandoId(null);
    } catch (error) {
      console.error("Error al guardar artista:", error);
      alert(error.message || "No se pudo guardar el artista");
    }
  };

  const handleEdit = (id) => {
    const artista = artistas.find((a) => a.id === id);
    if (!artista) return;
    setForm({ nombre: artista.nombre, tipo: artista.tipo });
    setEditandoId(id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar artista?")) return;
    try {
      await deleteArtista(id);
      setArtistas(artistas.filter((a) => a.id !== id));
    } catch (error) {
      console.error("Error al eliminar artista:", error);
      alert(error.message || "No se pudo eliminar el artista");
    }
  };

  return (
    <div>
      <Header />

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          margin: "20px 0",
          flexWrap: "wrap",
          marginTop: "100px",
        }}
      >
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del artista"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="tipo"
          placeholder="Tipo de arte"
          value={form.tipo}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {editandoId ? "Guardar Cambios" : "Agregar Artista"}
        </button>
      </form>

      <Table bordered hover className="tabla w-75 mx-auto">
        <thead className="table-primary">
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Tipo de arte</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {artistas.map((artista) => (
            <tr key={artista.id}>
              <td>{artista.id}</td>
              <td>{artista.nombre}</td>
              <td>{artista.tipo}</td>
              <td className="d-flex gap-2">
                <Button variant="primary" onClick={() => handleEdit(artista.id)}>
                  Editar
                </Button>
                <Button variant="danger" onClick={() => handleDelete(artista.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TablaArtistas;
