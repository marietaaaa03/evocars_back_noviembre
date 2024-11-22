const express = require('express');
const router = express.Router();
const OfertaController = require('../controllers/oferta.controller');

// Rutas CRUD para ofertas
router.get('/', OfertaController.getAllOfertas);
router.get('/:id', OfertaController.getOfertaById);
router.post('/', OfertaController.createOferta);
router.put('/:id', OfertaController.updateOferta);
router.delete('/:id', OfertaController.deleteOferta);

router.get('/autooff/:id_auto', OfertaController.getOfertaByIdAuto);

module.exports = router;
