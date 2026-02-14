import { pool } from "../db.js";
// ----- TURNOS -----

// Obtener turnos (por fecha o cliente)
export const getTurnos = async (req, res) => {
  const { fecha, cliente_id } = req.query;
  const cond = fecha ? "WHERE DATE(t.inicio)=?" :
        cliente_id ? "WHERE t.cliente_id=?" : "";
  const val = fecha ? [fecha] : cliente_id ? [cliente_id] : [];
  const q = `
    SELECT t.*, c.nombre AS cliente_nombre, s.nombre AS servicio_nombre
    FROM turnos t
    JOIN clientes c ON c.id = t.cliente_id
    JOIN servicios s ON s.id = t.servicio_id
    ${cond}
    ORDER BY t.inicio ${fecha ? "ASC" : "DESC"}
  `;
  try {
    const [r] = await pool.query(q, val);
    res.json(r);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener turnos" });
  }
};

// Crear un nuevo turno
export const CreateTurnos = async (req, res) => {
  const { cliente_id, servicio_id, inicio } = req.body;
  try {
    const [[s]] = await pool.query(
      "SELECT duracion_minutos FROM servicios WHERE id = ?",
      [servicio_id]
    );
    if (!s) return res.status(400).json({ error: "Servicio no encontrado" });

    const [v] = await pool.query(
      `SELECT COUNT(*) AS n
       FROM turnos
       WHERE estado = 'programado'
       AND inicio < DATE_ADD(?, INTERVAL ? MINUTE)
       AND fin > ?`,
      [inicio, s.duracion_minutos, inicio]
    );
    if (v[0].n) return res.status(409).json({ error: "Horario ocupado" });

    const [r] = await pool.query(
      `INSERT INTO turnos (cliente_id, servicio_id, inicio, fin, estado)
       VALUES (?, ?, ?, DATE_ADD(?, INTERVAL ? MINUTE), 'programado')`,
      [cliente_id, servicio_id, inicio, inicio, s.duracion_minutos]
    );

    const [[nuevo]] = await pool.query(
      `SELECT t.*, c.nombre AS cliente_nombre, s.nombre AS servicio_nombre
       FROM turnos t
       JOIN clientes c ON c.id = t.cliente_id
       JOIN servicios s ON s.id = t.servicio_id
       WHERE t.id = ?`,
      [r.insertId]
    );

    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: "Error al crear turno" });
  }
};

// Actualizar estado de un turno
export const ActualizarTurnos = async  (req, res) => {
  const { estado } = req.body;
  const { id } = req.params;
  try {
    await pool.query("UPDATE turnos SET estado = ? WHERE id = ?", [estado, id]);
    const [[t]] = await pool.query("SELECT * FROM turnos WHERE id = ?", [id]);
    res.json(t);
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar estado" });
  }
};

// Eliminar un turno
export const deleteTurnos = async (req, res) => {
  const { id } = req.params;
  try {
    const [r] = await pool.query("DELETE FROM turnos WHERE id = ?", [id]);
    res.json(r.affectedRows ? { ok: true } : { error: "Turno no encontrado" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar turno" });
  }
};