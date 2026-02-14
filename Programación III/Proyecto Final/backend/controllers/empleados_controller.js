const { connection } = require("../config/database.js");

const getEmpleados = (req, res) => {
    const consulta = "SELECT * FROM empleados";
    connection.query(consulta, (err,results) => {
        if (err) return res.status(500).json({ Error: "Error al obtener empleados..." });
        res.status(200).json(results);
    });
};

const getEmpleadobyID = (req, res) => {
    const { ID_Empleado } = req.params;
    const consulta = "SELECT * FROM empleados WHERE ID_Empleado = ?";
    connection.query(consulta, [ID_Empleado], (err, results) => {
        if (err) return res.status(500).json({ Error: "Error al buscar empleado..." });
        if (results.length === 0) {
            res.status(404).json({ Message: "Empleado no encontrado!" });
        } else {
            res.status(200).json(results[0]);
        }
    });
};

const addEmpleado = (req, res) => {
    const { nombre_empleado, telefono_empleado, mail_empleado, empleados_imagen } = req.body;
    const consultaCheck = "SELECT * FROM empleados WHERE mail_empleado=?";
    const consultaInsert = "INSERT INTO empleados(nombre_empleado, telefono_empleado, mail_empleado, empleados_imagen) VALUES (?,?,?,?)";

    if (!nombre_empleado || !mail_empleado) {
        return res.status(400).json({ Message: "Faltan datos obligatorios." });
    }

    connection.query(consultaCheck, [mail_empleado], (err, results) => {
        if (err) return res.status(500).json({ Error: "Error al validar empleado..." });

        if (results.length > 0) {
            return res.status(400).json({ Message: "Empleado ya registrado con ese correo!" });
        } else {
            connection.query(consultaInsert, [nombre_empleado, telefono_empleado, mail_empleado, empleados_imagen], (err2) => {
                if (err2) return res.status(500).json({ Error: "Error al registrar empleado..." });
                res.json({ Message: "Empleado creado exitosamente!" });
            });
        }
    });
};

const updateEmpleado = (req, res) => {
    const { ID_Empleado } = req.params;
    const { nombre_empleado, telefono_empleado, mail_empleado, empleados_imagen, estado } = req.body;

    const consultaCheck = "SELECT * FROM empleados WHERE mail_empleado=? AND ID_Empleado != ?";
    const consultaUpdate = "UPDATE empleados SET nombre_empleado=?, telefono_empleado=?, mail_empleado=?, empleados_imagen=?, estado=? WHERE ID_Empleado=?";

    connection.query(consultaCheck, [mail_empleado, ID_Empleado], (err, results) => {
        if (err) return res.status(500).json({ Error: "Error al validar empleado..." });

        if (results.length > 0) {
            return res.status(400).json({ Message: "Ya existe otro empleado con ese correo!" });
        } else {
            connection.query(consultaUpdate,[nombre_empleado, telefono_empleado, mail_empleado, empleados_imagen, estado, ID_Empleado],(err2, results2) => {
                    if (err2) return res.status(500).json({ Error: "Error al actualizar empleado..." });

                    if (results2.affectedRows === 0) {
                        return res.status(404).json({ Message: "Empleado no encontrado!" });
                    } else {
                        res.json({ Message: "Empleado actualizado correctamente!" });
                    }
                }
            );
        }
    });
};

const deleteEmpleado = (req, res) => {
    const { ID_Empleado } = req.params;
    const consulta = "DELETE FROM empleados WHERE ID_Empleado = ?";

    connection.query(consulta, [ID_Empleado], (err, result) => {
        if (err) return res.status(500).json({ Error: "Error al eliminar empleado..." });

        if (result.affectedRows === 0) {
            return res.status(404).json({ Message: "Empleado no encontrado!" });
        } else {
            res.json({ Message: "Empleado eliminado exitosamente!" });
        }
    });
};

module.exports = {getEmpleados,getEmpleadobyID,addEmpleado,updateEmpleado,deleteEmpleado};
