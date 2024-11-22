const express = require('express');
const router = express.Router();
const CuponPorReservaController = require('../controllers/cuponPorReserva.controller');

// Rutas CRUD para cupones por reserva
router.get('/', CuponPorReservaController.getAllCuponesPorReserva);
router.get('/:id_cupon/:id_reserva', CuponPorReservaController.getCuponPorReservaById);
router.post('/', CuponPorReservaController.createCuponPorReserva);
router.put('/:id_cupon/:id_reserva', CuponPorReservaController.updateCuponPorReserva);
router.delete('/:id_cupon/:id_reserva', CuponPorReservaController.deleteCuponPorReserva);

module.exports = router;
