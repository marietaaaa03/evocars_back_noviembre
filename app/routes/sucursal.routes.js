const express = require('express');
const router = express.Router();
const SucursalController = require('../controllers/sucursal.controller');

// Rutas CRUD para sucursales
router.get('/', SucursalController.getAllSucursales);
router.get('/:id', SucursalController.getSucursalById);
router.post('/', SucursalController.createSucursal);
router.put('/:id', SucursalController.updateSucursal);
router.delete('/:id', SucursalController.deleteSucursal);

module.exports = router;
