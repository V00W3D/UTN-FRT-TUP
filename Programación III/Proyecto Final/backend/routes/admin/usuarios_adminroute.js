const EXPRESS = require('express')
const router = EXPRESS.Router()
const {getUsuarios,getUsuariobyID,updateUsuario,deleteUsuario} = require("../../controllers/usuarios_controller")

router.get("/usuarios",getUsuarios)
router.get("/usuarios/:ID_Usuario",getUsuariobyID)
router.put("/usuarios/update/:ID_Usuario",updateUsuario)
router.delete("/usuarios/delete/:ID_Usuario",deleteUsuario)

module.exports = router