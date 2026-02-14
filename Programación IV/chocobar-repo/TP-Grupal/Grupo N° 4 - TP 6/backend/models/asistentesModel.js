const pool = require("../config/db");

async function getAll() {
  const [rows] = await pool.query(
    "SELECT id, nombre, email, evento_id AS eventoId FROM asistentes ORDER BY id"
  );
  return rows;
}

async function getById(id) {
  const [rows] = await pool.query(
    "SELECT id, nombre, email, evento_id AS eventoId FROM asistentes WHERE id = ?",
    [id]
  );
  return rows[0] || null;
}

async function create({ nombre, email, eventoId }) {
  const [eventRows] = await pool.query(
    "SELECT id, cupo FROM eventos WHERE id = ?",
    [eventoId]
  );
  const evento = eventRows[0];
  if (!evento) {
    const error = new Error("Evento no encontrado");
    error.status = 404;
    throw error;
  }

  const [countRows] = await pool.query(
    "SELECT COUNT(*) AS asistentes FROM asistentes WHERE evento_id = ?",
    [eventoId]
  );
  const ocupados = countRows[0].asistentes;
  if (ocupados >= evento.cupo) {
    const error = new Error("El evento ya alcanzó el cupo máximo");
    error.status = 400;
    throw error;
  }

  const [result] = await pool.query(
    "INSERT INTO asistentes (nombre, email, evento_id) VALUES (?, ?, ?)",
    [nombre, email, eventoId]
  );
  return getById(result.insertId);
}

async function update(id, { nombre, email, eventoId }) {
  await pool.query(
    "UPDATE asistentes SET nombre = ?, email = ?, evento_id = ? WHERE id = ?",
    [nombre, email, eventoId, id]
  );
  return getById(id);
}

async function remove(id) {
  const [result] = await pool.query("DELETE FROM asistentes WHERE id = ?", [id]);
  return result.affectedRows > 0;
}

module.exports = { getAll, getById, create, update, remove };
