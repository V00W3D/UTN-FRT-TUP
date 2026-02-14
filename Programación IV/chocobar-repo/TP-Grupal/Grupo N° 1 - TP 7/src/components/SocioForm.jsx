import React, { useState, useEffect } from "react";
import Input from "./common/Input";
import Button from "./common/Button";
import "../styles/SocioForm.css";

function SocioForm({ onAddSocio, onUpdateSocio, socioToEdit, onCancelEdit }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [rol, setRol] = useState("socio");
  const [error, setError] = useState("");

  useEffect(() => {
    if (socioToEdit) {
      setNombre(socioToEdit.nombre);
      setApellido(socioToEdit.apellido);
      setEmail(socioToEdit.email);
      setRol(socioToEdit.rol);
    } else {
      setNombre("");
      setApellido("");
      setEmail("");
      setRol("socio");
      setError("");
    }
  }, [socioToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim() || !apellido.trim() || !email.trim()) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    setError("");
    const socioData = { nombre, apellido, email, rol };
    if (socioToEdit) {
      onUpdateSocio({ ...socioToEdit, ...socioData });
    } else {
      onAddSocio({ id: Date.now(), ...socioData });
    }
    setNombre("");
    setApellido("");
    setEmail("");
    setRol("socio");
  };

  return (
    <form onSubmit={handleSubmit} className="socio-form-container">
      <h3>{socioToEdit ? "Editar Socio" : "Registrar Nuevo Socio"}</h3>
      {error && <p className="error-message">{error}</p>}
      <Input label="Nombre" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      <Input label="Apellido" id="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
      <Input label="Email" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <div className="input-group">
        <label htmlFor="rol">Rol:</label>
        <select id="rol" value={rol} onChange={(e) => setRol(e.target.value)} className="input-field">
          <option value="socio">Socio</option>
          <option value="administrador">Administrador</option>
        </select>
      </div>
      <div className="form-actions">
        <Button type="submit">{socioToEdit ? "Actualizar Socio" : "Agregar Socio"}</Button>
        {socioToEdit && <Button type="button" onClick={onCancelEdit} className="btn-secondary">Cancelar Edición</Button>}
      </div>
    </form>
  );
}

export default SocioForm;
