const express = require('express');
const router = express.Router();
const FotoAutoController = require('../controllers/fotos_autos.controller');

// Rutas CRUD para fotos de autos
router.get('/', FotoAutoController.getAllFotos);
router.get('/:id', FotoAutoController.getFotoById);
router.get('/auto/:id_auto', FotoAutoController.getFotosByAutoId); // Obtener fotos por id_auto
router.post('/', FotoAutoController.createFoto);
router.put('/:id', FotoAutoController.updateFoto);
router.delete('/:id', FotoAutoController.deleteFoto);

module.exports = router;
