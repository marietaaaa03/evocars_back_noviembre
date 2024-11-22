const express = require('express');
const router = express.Router();
const ColorController = require('../controllers/color.controller');

// Rutas CRUD para colores
router.get('/', ColorController.getAllColors);
router.get('/:id', ColorController.getColorById);
router.post('/', ColorController.createColor);
router.put('/:id', ColorController.updateColor);
router.delete('/:id', ColorController.deleteColor);

module.exports = router;
