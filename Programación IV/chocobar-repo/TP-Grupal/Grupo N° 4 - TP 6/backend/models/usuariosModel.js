const pool = require("../config/db");

const sanitizeUser = (user) => {
  if (!user) return null;
  const { password, ...rest } = user;
  return rest;
};

async function getAll() {
  const [rows] = await pool.query(
    "SELECT id, nombre, email, rol FROM usuarios ORDER BY id"
  );
  return rows;
}

async function getById(id) {
  const [rows] = await pool.query(
    "SELECT id, nombre, email, rol FROM usuarios WHERE id = ?",
    [id]
  );
  return rows[0] || null;
}

async function getByNombre(nombre) {
  const [rows] = await pool.query("SELECT * FROM usuarios WHERE nombre = ? LIMIT 1", [
    nombre,
  ]);
  return rows[0] || null;
}

async function create({ nombre, email = null, password, rol = "usuario" }) {
  const [result] = await pool.query(
    "INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)",
    [nombre, email, password, rol]
  );
  return getById(result.insertId);
}

async function update(id, { nombre, email = null, password, rol }) {
  const fields = [];
  const values = [];

  if (nombre !== undefined) {
    fields.push("nombre = ?");
    values.push(nombre);
  }
  if (email !== undefined) {
    fields.push("email = ?");
    values.push(email);
  }
  if (password !== undefined) {
    fields.push("password = ?");
    values.push(password);
  }
  if (rol !== undefined) {
    fields.push("rol = ?");
    values.push(rol);
  }

  if (!fields.length) {
    return getById(id);
  }

  values.push(id);
  await pool.query(`UPDATE usuarios SET ${fields.join(", ")} WHERE id = ?`, values);
  return getById(id);
}

async function remove(id) {
  const [result] = await pool.query("DELETE FROM usuarios WHERE id = ?", [id]);
  return result.affectedRows > 0;
}

module.exports = {
  getAll,
  getById,
  getByNombre,
  create,
  update,
  remove,
  sanitizeUser,
};
