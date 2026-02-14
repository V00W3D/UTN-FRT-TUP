import express from "express";
import { getTurnos, CreateTurnos, ActualizarTurnos, deleteTurnos } from "../Controllers/TurnosController.js";

const router = express.Router();   

// GET /turnos
router.get("/", getTurnos); 
// POST /turnos
router.post("/", CreateTurnos);  
// PATCH /turnos/:id/estado
router.patch("/:id/estado", ActualizarTurnos);  
// DELETE /turnos/:id
router.delete("/:id", deleteTurnos);

export default router;
