import express from 'express';
import { getServicios, createServicio, deleteServicio } from '../Controllers/ServiciosController.js';

const router = express.Router();

// GET /servicios
router.get('/', getServicios);
// POST /servicios
router.post('/', createServicio);
// DELETE /servicios/:id
router.delete('/:id', deleteServicio);

export default router;