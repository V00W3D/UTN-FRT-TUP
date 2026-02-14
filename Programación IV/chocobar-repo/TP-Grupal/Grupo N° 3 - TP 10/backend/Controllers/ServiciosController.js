import { pool } from "../db.js";

export const getServicios = async (req, res) => {
  const [r] = await pool.query("SELECT * FROM servicios ORDER BY precio ASC");
  res.json(r);
};

export const createServicio = async (req, res) => {
  const { nombre, precio, duracion_minutos = 60 } = req.body;
  const [r] = await pool.query("INSERT INTO servicios (nombre, precio, duracion_minutos) VALUES (?,?,?)", [nombre, precio, duracion_minutos]);
  const [[nuevo]] = await pool.query("SELECT * FROM servicios WHERE id=?", [r.insertId]);
  res.status(201).json(nuevo);
};

export const deleteServicio = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM turnos WHERE servicio_id=?", [id]);
  const [r] = await pool.query("DELETE FROM servicios WHERE id=?", [id]);
  res.json(r.affectedRows ? { ok: true } : { error: "Servicio no encontrado" });
};
