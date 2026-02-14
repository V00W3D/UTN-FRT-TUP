const { connection } = require("../config/database.js");

const crearSesion = (req, res) => {
    const { FK_IDUsuario, tipo } = req.body;

    if (!FK_IDUsuario || !tipo) return res.status(400).json({ Message: "Faltan datos para crear sesión." });

    const insert = `INSERT INTO sesiones (FK_IDUsuario, tipo, estado) VALUES (?, ?, 'activo')`;

    connection.query(insert, [FK_IDUsuario, tipo], (err, result) => {
        if (err) return res.status(500).json({ Error: "Error al registrar sesión." });
        res.json({ Message: "Sesión creada exitosamente.", ID_Sesion: result.insertId });
    });
};

const getSesiones = (req, res) => {
    const query = `SELECT * FROM sesiones WHERE estado='activo' ORDER BY fecha DESC`;

    connection.query(query, (err, results) => {
        if (err) return res.status(500).json({ Error: "Error al obtener sesiones." });
        res.json(results);
    });
};

const cerrarSesion = (req, res) => {
    const { ID_Sesion } = req.params;

    const query = `UPDATE sesiones SET estado='inactivo' WHERE ID_Sesion = ?`;

    connection.query(query, [ID_Sesion], (err, result) => {
        if (err) return res.status(500).json({ Error: "Error al cerrar sesión." });
        res.json({ Message: "Sesión cerrada correctamente." });
    });
};

module.exports = { crearSesion, getSesiones, cerrarSesion };
