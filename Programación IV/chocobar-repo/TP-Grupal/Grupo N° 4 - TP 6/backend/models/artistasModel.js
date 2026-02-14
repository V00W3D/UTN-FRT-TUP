const pool = require("../config/db");

async function getAll() {
  const [rows] = await pool.query("SELECT id, nombre, tipo FROM artistas ORDER BY id");
  return rows;
}

async function getById(id) {
  const [rows] = await pool.query(
    "SELECT id, nombre, tipo FROM artistas WHERE id = ?",
    [id]
  );
  return rows[0] || null;
}

async function create({ nombre, tipo }) {
  const [result] = await pool.query(
    "INSERT INTO artistas (nombre, tipo) VALUES (?, ?)",
    [nombre, tipo]
  );
  return getById(result.insertId);
}

async function update(id, { nombre, tipo }) {
  await pool.query("UPDATE artistas SET nombre = ?, tipo = ? WHERE id = ?", [
    nombre,
    tipo,
    id,
  ]);
  return getById(id);
}

async function remove(id) {
  const [result] = await pool.query("DELETE FROM artistas WHERE id = ?", [id]);
  return result.affectedRows > 0;
}

module.exports = { getAll, getById, create, update, remove };
