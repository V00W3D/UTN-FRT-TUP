const { connection } = require("../config/database.js");

const getUsuarios = (req, res) => {
    const consulta = "SELECT * FROM usuarios";
    connection.query(consulta, (err, results) => {
        if (err) return res.status(500).json({ Error: "Error al obtener usuarios..." });
        res.status(200).json(results);
    });
};

const getUsuariobyID = (req, res) => {
    const { ID_Usuario } = req.params;
    const consulta = "SELECT * FROM usuarios WHERE ID_Usuario = ?";
    connection.query(consulta, [ID_Usuario], (err, results) => {
        if (err) return res.status(500).json({ Error: "Error al buscar usuario..." });
        if (results.length === 0) {
            res.status(404).json({ Message: "Usuario no encontrado!" });
        } else {
            res.status(200).json(results[0]);
        }
    });
};

const addUsuario = (req, res) => {
    const { nombre_user, pass, mail_user, telefono_user, usuarios_imagen } = req.body;
    const consultaCheck = "SELECT * FROM usuarios WHERE nombre_user=? OR mail_user=?";
    const consultaInsert = "INSERT INTO usuarios(nombre_user, pass, mail_user, telefono_user, usuarios_imagen) VALUES (?,?,?,?,?)";

    if (!nombre_user || !pass || !mail_user) {
        return res.status(400).json({ Message: "Faltan datos obligatorios." });
    }

    connection.query(consultaCheck, [nombre_user, mail_user], (err, results) => {
        if (err) return res.status(500).json({ Error: "Error al validar usuario..." });

        if (results.length > 0) {
            return res.status(400).json({ Message: "Usuario o correo ya existente!" });
        } else {
            connection.query(consultaInsert, [nombre_user, pass, mail_user, telefono_user, usuarios_imagen], (err2) => {
                if (err2) return res.status(500).json({ Error: "Error al registrar usuario..." });
                res.json({ Message: "Usuario creado exitosamente!" });
            });
        }
    });
};

const updateUsuario = (req, res) => {
    const { ID_Usuario } = req.params;
    const { nombre_user, pass, mail_user, telefono_user, usuarios_imagen } = req.body;

    const consultaCheck = "SELECT * FROM usuarios WHERE (nombre_user=? OR mail_user=?) AND ID_Usuario != ?";
    const consultaUpdate = "UPDATE usuarios SET nombre_user=?, pass=?, mail_user=?, telefono_user=?, usuarios_imagen=? WHERE ID_Usuario=?";

    connection.query(consultaCheck, [nombre_user, mail_user, ID_Usuario], (err, results) => {
        if (err) return res.status(500).json({ Error: "Error al validar usuario..." });

        if (results.length > 0) {
            return res.status(400).json({ Message: "Ya existe otro usuario con esos datos!" });
        } else {
            connection.query(consultaUpdate, [nombre_user, pass, mail_user, telefono_user, usuarios_imagen, ID_Usuario], (err2, results2) => {
                if (err2) return res.status(500).json({ Error: "Error al actualizar usuario..." });

                if (results2.affectedRows === 0) {
                    return res.status(404).json({ Message: "Usuario no encontrado!" });
                } else {
                    res.json({ Message: "Usuario actualizado correctamente!" });
                }
            });
        }
    });
};

const deleteUsuario = (req, res) => {
    const { ID_Usuario } = req.params;
    const consulta = "DELETE FROM usuarios WHERE ID_Usuario = ?";

    connection.query(consulta, [ID_Usuario], (err, result) => {
        if (err) return res.status(500).json({ Error: "Error al eliminar usuario..." });

        if (result.affectedRows === 0) {
            return res.status(404).json({ Message: "Usuario no encontrado!" });
        } else {
            res.json({ Message: "Usuario eliminado exitosamente!" });
        }
    });
};

const loginUsuario = (req, res) => {
    const { nombre_user, pass } = req.body;
    const consulta = "SELECT * FROM usuarios WHERE nombre_user=? AND pass=?";

    connection.query(consulta, [nombre_user, pass], (err, results) => {
        if (err) return res.status(500).json({ Error: "Error al intentar logear..." });

        if (results.length > 0) {
            const usuario = results[0];
            res.json({ existe: true, usuario });
        } else {
            res.status(401).json({ existe: false, Message: "Credenciales inválidas" });
        }
    });
};

module.exports = {getUsuarios,getUsuariobyID,addUsuario,updateUsuario,deleteUsuario,loginUsuario};
