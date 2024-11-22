const express = require('express');
const router = express.Router();
const CuponPorVendedorController = require('../controllers/cuponPorVendedor.controller');

// Rutas CRUD para cupones por vendedor
router.get('/', CuponPorVendedorController.getAllCuponesPorVendedor);
router.get('/:id_cupon/:id_usuario', CuponPorVendedorController.getCuponPorVendedorById);
router.post('/', CuponPorVendedorController.createCuponPorVendedor);
router.put('/:id_cupon/:id_usuario', CuponPorVendedorController.updateCuponPorVendedor);
router.delete('/:id_cupon/:id_usuario', CuponPorVendedorController.deleteCuponPorVendedor);

module.exports = router;
