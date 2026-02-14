import { pool } from "../db.js";

export const getDisponibilidad = async (req, res) => {
  try {
    const inicio = req.query.inicio || req.query.start_time;
    const fin = req.query.fin || req.query.end_time;

    if (!inicio || !fin) {
      return res.status(400).json({ error: "Faltan parámetros" });
    }

    const [[r]] = await pool.query(
      "SELECT COUNT(*) AS n FROM turnos WHERE estado='programado' AND inicio<? AND fin>?",
      [fin, inicio]
    );

    return res.json({ disponible: r.n === 0 });
  } catch (err) {
    console.error("DisponibilidadController error:", err);
    return res.status(500).json({ error: "Error interno al comprobar disponibilidad" });
  }
};

export default getDisponibilidad;
