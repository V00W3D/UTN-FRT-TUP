import express from 'express';
import { getClientes, createCliente, deleteCliente } from '../Controllers/ClientesController.js';

const router = express.Router();

// GET /clientes
router.get('/', getClientes);
// POST /clientes
router.post('/', createCliente);
// DELETE /clientes/:id
router.delete('/:id', deleteCliente);

export default router;