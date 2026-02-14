const { connection } = require("../config/database");

const getCarrito = (req, res) => {
  const query = `
    SELECT 
      c.ID_Carrito,c.FK_IDUsuario,c.cantidad,
      p.ID_Prod,p.nombre_prod,p.precio,p.productos_imagen,
      u.nombre_user
    FROM carrito c
    JOIN productos p ON 
    c.FK_IDProd = p.ID_Prod
    JOIN usuarios u ON
    c.FK_IDUsuario = u.ID_Usuario
  `;
  connection.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: "Error al obtener el carrito." });
    res.json(results);
  });
};

const addCarrito = (req, res) => {
  const { FK_IDUsuario, FK_IDProd, cantidad } = req.body;

  const verificarQuery = `SELECT * FROM carrito WHERE FK_IDUsuario = ? AND FK_IDProd = ?`;
  const insertarQuery = `INSERT INTO carrito (FK_IDUsuario, FK_IDProd, cantidad) VALUES (?, ?, ?)`;
  const actualizarQuery = `UPDATE carrito SET cantidad = cantidad + ? WHERE FK_IDUsuario = ? AND FK_IDProd = ?`;

  connection.query(verificarQuery, [FK_IDUsuario, FK_IDProd], (err, results) => {
    if (err) return res.status(500).json({ error: "Error al verificar el carrito." });

    if (results.length > 0) {
      // Ya existe, entonces actualiza
      connection.query(actualizarQuery, [cantidad, FK_IDUsuario, FK_IDProd], (err) => {
        if (err) return res.status(500).json({ error: "Error al actualizar cantidad." });
        res.json({ message: "Cantidad actualizada en el carrito." });
      });
    } else {
      // No existe, entonces inserta
      connection.query(insertarQuery, [FK_IDUsuario, FK_IDProd, cantidad], (err) => {
        if (err) return res.status(500).json({ error: "Error al agregar al carrito." });
        res.json({ message: "Producto agregado al carrito." });
      });
    }
  });
};


const updateCantidad = (req, res) => {
  const { id } = req.params;
  const { cantidad } = req.body;
  const query = `UPDATE carrito SET cantidad = ? WHERE ID_Carrito = ?`;
  
  connection.query(query, [cantidad, id], (err) => {
    if (err) return res.status(500).json({ error: "Error al actualizar cantidad." });
    res.json({ message: "Cantidad actualizada correctamente." });
  });
};

const deleteItem = (req, res) => {
  const { id } = req.params;
  const query = `
    DELETE FROM carrito WHERE ID_Carrito = ?
  `;
  
  connection.query(query, [id], (err) => {
    if (err) return res.status(500).json({ error: "Error al eliminar producto del carrito." });
    res.json({ message: "Producto eliminado del carrito." });
  });
};


const vaciarCarrito = (req, res) => {
  const query = `TRUNCATE TABLE carrito`;

  connection.query(query, (err) => {
    if (err) return res.status(500).json({ error: "Error al vaciar el carrito." });
    res.json({ message: "Carrito vaciado." });
  });
};

module.exports = {getCarrito, addCarrito,updateCantidad, deleteItem,vaciarCarrito};
