const EXPRESS = require('express')
const router = EXPRESS.Router()
const {addUsuario,loginUsuario} = require("../../controllers/usuarios_controller")

router.post("/usuarios/login",loginUsuario)
router.post("/usuarios/register",addUsuario)

module.exports = router