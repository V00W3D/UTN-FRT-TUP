const pool = require("../config/db");

async function mapEventosWithArtistas(eventos) {
  if (!eventos.length) return [];
  const ids = eventos.map((evento) => evento.id);
  const [relaciones] = await pool.query(
    "SELECT evento_id, artista_id FROM evento_artistas WHERE evento_id IN (?)",
    [ids]
  );

  return eventos.map((evento) => ({
    ...evento,
    artistas: relaciones
      .filter((rel) => rel.evento_id === evento.id)
      .map((rel) => rel.artista_id),
  }));
}

async function getAll() {
  const [rows] = await pool.query(
    "SELECT id, nombre, DATE_FORMAT(fecha, '%Y-%m-%d') AS fecha, lugar, cupo FROM eventos ORDER BY id"
  );
  return mapEventosWithArtistas(rows);
}

async function getById(id) {
  const [rows] = await pool.query(
    "SELECT id, nombre, DATE_FORMAT(fecha, '%Y-%m-%d') AS fecha, lugar, cupo FROM eventos WHERE id = ?",
    [id]
  );
  const eventos = await mapEventosWithArtistas(rows);
  return eventos[0] || null;
}

async function create({ nombre, fecha, lugar, cupo, artistas = [] }) {
  const [result] = await pool.query(
    "INSERT INTO eventos (nombre, fecha, lugar, cupo) VALUES (?, ?, ?, ?)",
    [nombre, fecha, lugar, Number(cupo)]
  );
  const eventoId = result.insertId;

  if (Array.isArray(artistas) && artistas.length) {
    const values = artistas.map((artistaId) => [eventoId, artistaId]);
    await pool.query(
      "INSERT INTO evento_artistas (evento_id, artista_id) VALUES ?",
      [values]
    );
  }

  return getById(eventoId);
}

async function update(id, { nombre, fecha, lugar, cupo, artistas }) {
  await pool.query(
    "UPDATE eventos SET nombre = ?, fecha = ?, lugar = ?, cupo = ? WHERE id = ?",
    [nombre, fecha, lugar, Number(cupo), id]
  );

  if (Array.isArray(artistas)) {
    await pool.query("DELETE FROM evento_artistas WHERE evento_id = ?", [id]);
    if (artistas.length) {
      const values = artistas.map((artistaId) => [id, artistaId]);
      await pool.query(
        "INSERT INTO evento_artistas (evento_id, artista_id) VALUES ?",
        [values]
      );
    }
  }

  return getById(id);
}

async function remove(id) {
  const [result] = await pool.query("DELETE FROM eventos WHERE id = ?", [id]);
  return result.affectedRows > 0;
}

module.exports = { getAll, getById, create, update, remove };
