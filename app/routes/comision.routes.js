const express = require('express');
const router = express.Router();
const ComisionController = require('../controllers/comision.controller');

// Rutas CRUD para comisiones
router.get('/', ComisionController.getAllComisiones);
router.get('/:id', ComisionController.getComisionById);
router.post('/', ComisionController.createComision);
router.put('/:id', ComisionController.updateComision);
router.delete('/:id', ComisionController.deleteComision);

module.exports = router;
