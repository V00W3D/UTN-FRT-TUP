const { connection } = require("../config/database.js")

const getVentas = (req, res) => {
    const consulta = `
    SELECT v.*, u.nombre_user, u.usuarios_imagen, p.nombre_prod, p.productos_imagen
    FROM ventas v
        JOIN usuarios u ON v.FK_IDUsuario = u.ID_Usuario
        JOIN productos p ON v.FK_IDProd = p.ID_Prod
  `;

    connection.query(consulta, (err, results) => {
        if (err) return res.status(500).json({Error:"Error al obtener las ventas..."})
        res.status(200).json(results)
    })
}

const getVentabyOrder = (req, res) => {
    const { numero_orden } = req.params
    const consulta = `
    SELECT v.*, u.nombre_user, u.usuarios_imagen, p.nombre_prod, p.productos_imagen
        FROM ventas v
            JOIN usuarios u ON v.FK_IDUsuario = u.ID_Usuario
            JOIN productos p ON v.FK_IDProd = p.ID_Prod
            WHERE v.numero_orden = ?
`

    connection.query(consulta, [numero_orden], (err, results) => {
        if (err) return res.status(500).json({Error:"Error al obtener la venta..."})
        if (results.length === 0) return res.status(404).json({Message:"Venta no encontrada!"})
        res.status(200).json(results)
    })
}

const addVenta = (req, res) => {
    const { usuario, productos, total } = req.body

    if (!usuario || !productos || productos.length === 0 || !total) {
        return res.status(400).json({Message:"Faltan datos para registrar la venta..."})
    }

    const consultaMaxOrden = "SELECT MAX(numero_orden) AS maxOrden FROM ventas"

    connection.query(consultaMaxOrden, (err, results) => {
        if (err) return res.status(500).json({Error:"Error al obtener el número de orden..."})

        const ultimo = results[0].maxOrden
        const nuevoOrden = (ultimo ? ultimo : 0) + 1 
        const consultaInsert = "INSERT INTO ventas (numero_orden, FK_IDUsuario, FK_IDProd, cantidad, precio_unitario, total_orden) VALUES (?, ?, ?, ?, ?, ?)"

        let completados = 0

        productos.forEach((producto) => {
            const { id, cantidad, precio } = producto

            connection.query(consultaInsert, [nuevoOrden, usuario, id, cantidad, precio, total], (err2) => {
                if (err2) return res.status(500).json({Error:"Error al registrar uno de los productos..."})

                completados++

                if (completados === productos.length) {
                    res.status(200).json({Message:"Venta registrada correctamente!", numero_orden: nuevoOrden})
                }
            })
        })
    })
}

const deleteVenta = (req, res) => {
    const { numero_orden } = req.params
    const consulta = "DELETE FROM ventas WHERE numero_orden = ?"

    connection.query(consulta, [numero_orden], (err, result) => {
        if (err) return res.status(500).json({Error:"Error al eliminar la venta..."})
        if (result.affectedRows === 0) {
            return res.status(404).json({Message:"Venta no encontrada!"})
        }
        res.status(200).json({Message:"Venta eliminada correctamente!"})
    })
}

module.exports = { getVentas, getVentabyOrder, addVenta, deleteVenta }
