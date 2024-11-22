const express = require('express');
const router = express.Router();
const DisponibilidadController = require('../controllers/disponibilidad.controller');

// Rutas CRUD para disponibilidades
router.get('/', DisponibilidadController.getAllDisponibilidades);
router.get('/:id', DisponibilidadController.getDisponibilidadById);
router.post('/', DisponibilidadController.createDisponibilidad);
router.put('/:id', DisponibilidadController.updateDisponibilidad);
router.delete('/:id', DisponibilidadController.deleteDisponibilidad);

module.exports = router;
