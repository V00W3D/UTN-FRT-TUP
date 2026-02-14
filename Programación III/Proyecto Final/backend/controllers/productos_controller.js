const {connection} = require("../config/database.js")

const getProductos = (req,res)=>{
    const consulta = "SELECT * FROM productos"

    connection.query(consulta,(err,results)=>{
        if (err) return res.status(500).json({Error:"Error al obtener productos..."});
        res.status(200).json(results)
    })
}

const getProductobyID = (req,res)=>{
    const { ID_Prod } = req.params
    const consulta = "SELECT * FROM productos WHERE ID_Prod=?"

    connection.query(consulta,[ID_Prod],(err,results)=>{
        if(err) return res.status(500).json({Error:"Error al buscar el producto..."});
        if(results.length === 0){
            res.status(404).send({Message:"Producto no encontrado!"})
        }else{
            res.status(200).json(results[0])
        }
    })
}

const addProducto = (req,res)=>{
    const {nombre_prod,precio,stock,productos_imagen,FK_IDCategoria} = req.body
    const consultaInsert = "INSERT INTO productos(nombre_prod,precio,stock,productos_imagen,FK_IDCategoria) VALUES(?,?,?,?,?)"
    const consultaCheck = "SELECT * FROM productos WHERE nombre_prod=? AND precio=? AND stock=? AND productos_imagen=? AND FK_IDCategoria=?"

    connection.query(consultaCheck,[nombre_prod,precio,stock,productos_imagen,FK_IDCategoria],(err,results)=>{
        if(err) return res.status(500).json({Error:"Error al confirmar producto..."});
        
        if (results.length>0){
                res.status(400).json({Message:"Producto ya existente!"})
        }
        else{
                connection.query(consultaInsert,[nombre_prod,precio,stock,productos_imagen,FK_IDCategoria],(err2,results2)=>{
                    if(err2) return res.status(500).json({Error:"Error al insertar el producto..."});
                    res.json({Message:"Producto agregado exitosamente!"})
                })
        }  
    })
}

const updateProducto = (req, res) => {
    const { ID_Prod } = req.params
    const { nombre_prod, precio, stock, productos_imagen } = req.body

    const consultaCheck = "SELECT * FROM productos WHERE nombre_prod = ? AND precio = ? AND stock = ? AND productos_imagen = ? AND ID_Prod!=?"
    const consultaUpdate = "UPDATE productos SET nombre_prod = ?, precio = ?, stock = ?, productos_imagen = ? WHERE ID_Prod = ?"

    connection.query(consultaCheck, [nombre_prod, precio, stock, productos_imagen,ID_Prod], (err, results) => {
        if (err) return res.status(500).json({Error:"Error al validar producto..."});

        if (results.length > 0) {
            return res.status(400).json({Message:"Ya existe otro producto con esos datos!"});
        }else{
            connection.query(consultaUpdate, [nombre_prod, precio, stock, productos_imagen, ID_Prod], (err2, results2) => {
                if (err2) return res.status(500).json({Error:"Error al actualizar producto..."});

                if (results2.affectedRows === 0) {
                    return res.status(404).json({Message:"Producto no encontrado!"});
                }else{
                    res.json({Message:"Producto actualizado correctamente!"});
                }
            });
        }
    });
};

const deleteProducto = (req, res) => {
    const { ID_Prod } = req.params;

    const consulta = "DELETE FROM productos WHERE ID_Prod = ?";

    connection.query(consulta, [ID_Prod], (err, result) => {
        if (err) return res.status(500).json({Error:"Error al eliminar el producto..."});

        if (result.affectedRows === 0) {
            return res.status(404).json({Message:"Producto no encontrado!"});
        } else {
            res.json({ Message: "Producto eliminado exitosamente!" });
        }
    });
};

module.exports = {getProductos,getProductobyID,addProducto,updateProducto,deleteProducto}