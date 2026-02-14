const { connection } = require("../config/database");

const getCategorias = (req, res) => {
  connection.query("SELECT * FROM categorias", (err, results) => {
    if (err) return res.status(500).json({ error: "Error al obtener categorías" });
    res.json(results);
  });
};

module.exports = { getCategorias };
