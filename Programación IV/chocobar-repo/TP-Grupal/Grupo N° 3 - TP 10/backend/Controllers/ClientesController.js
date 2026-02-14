import { pool } from "../db.js";

export const getClientes = async (req, res) => {
  const [r] = await pool.query("SELECT * FROM clientes ORDER BY creado_en DESC");
  res.json(r);
};

export const createCliente = async (req, res) => {
  const { nombre, correo, telefono } = req.body;
  const [r] = await pool.query("INSERT INTO clientes (nombre, correo, telefono) VALUES (?,?,?)", [nombre, correo, telefono]);
  const [[nuevo]] = await pool.query("SELECT * FROM clientes WHERE id=?", [r.insertId]);
  res.status(201).json(nuevo);
};

export const deleteCliente = async (req, res) => {
  const { id } = req.params;
  // remove related turnos first
  await pool.query("DELETE FROM turnos WHERE cliente_id=?", [id]);
  const [r] = await pool.query("DELETE FROM clientes WHERE id=?", [id]);
  res.json(r.affectedRows ? { ok: true } : { error: "Cliente no encontrado" });
};