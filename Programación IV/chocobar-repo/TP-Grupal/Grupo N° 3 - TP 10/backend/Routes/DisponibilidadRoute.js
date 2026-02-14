import express from "express";
import { getDisponibilidad } from "../Controllers/DisponibilidadController.js";

const router = express.Router();

// GET /disponibilidad
router.get("/", getDisponibilidad);

export default router;