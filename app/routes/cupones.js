const express = require('express');
const router = express.Router();
const CuponController = require('../controllers/cupon.controller');

router.get('/', CuponController.getAllCupones);
router.get('/:id', CuponController.getCuponById);
router.get('/usuario/:idUsuario', CuponController.getCuponesByUsuario);
router.post('/', CuponController.createCupon);
router.put('/:id', CuponController.updateCupon);
router.delete('/:id', CuponController.deleteCupon);

module.exports = router;