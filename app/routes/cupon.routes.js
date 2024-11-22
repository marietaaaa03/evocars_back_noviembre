const express = require('express');
const router = express.Router();
const CuponController = require('../controllers/cupon.controller');

// Rutas CRUD para cupones
router.get('/', CuponController.getAllCupones);
router.get('/:id', CuponController.getCuponById);
router.post('/', CuponController.createCupon);
router.put('/:id', CuponController.updateCupon);
router.delete('/:id', CuponController.deleteCupon);
router.get('/usuario/:id_usuario', CuponController.getCuponesByUserId);

module.exports = router;
