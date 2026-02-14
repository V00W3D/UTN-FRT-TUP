const AuthControllers = require("../controllers/AuthController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const router = require("express").Router();

router.post("/login", AuthMiddleware.Login, AuthControllers.Login);
router.post("/register", AuthMiddleware.Register, AuthControllers.Register);
router.put("/logout", AuthControllers.Logout);
router.get("/me", AuthControllers.Me);

module.exports = router;
