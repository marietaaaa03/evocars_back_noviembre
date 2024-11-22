const express = require('express');
const router = express.Router();
const RentaController = require('../controllers/renta.controller');

// Rutas CRUD para rentas
router.get('/', RentaController.getAll);
router.get('/:id_reserva', RentaController.getById);
router.post('/', RentaController.create);
router.put('/:id_reserva', RentaController.update);
router.delete('/:id_reserva', RentaController.delete);

module.exports = router;
