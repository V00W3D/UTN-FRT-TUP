import { useState } from "react";
import ModalBuilder from "../../../../utils/ModalBuilder";
import { useUserHook } from "../../../../hooks/useUserHook";

export function DonarModal({ show, beneficiario, onClose }) {
  const { realizarDonacion } = useUserHook();
  const [form, setForm] = useState({
    producto: "",
    cantidad: 1,
    tipo: "Alimento",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      if (!usuario) throw new Error("Debes iniciar sesión para donar");

      await realizarDonacion(usuario.id, beneficiario.id, form);
      alert("¡Gracias por tu donación!");
      onClose();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <ModalBuilder
      show={show}
      title={`Donar a ${beneficiario?.nombre ?? ""}`}
      onClose={onClose}
      actions={
        <>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn btn-primary" type="submit" form="donarForm">
            Donar
          </button>
        </>
      }
    >
      <form id="donarForm" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Producto</label>
          <input
            type="text"
            name="producto"
            value={form.producto}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label>Cantidad</label>
          <input
            type="number"
            name="cantidad"
            value={form.cantidad}
            min={1}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label>Tipo</label>
          <select
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            className="form-select"
          >
            <option>Alimento</option>
            <option>Ropa</option>
            <option>Medicamento</option>
            <option>Otro</option>
          </select>
        </div>
      </form>
    </ModalBuilder>
  );
}
