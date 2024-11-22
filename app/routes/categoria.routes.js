const express = require('express');
const router = express.Router();
const CategoriaController = require('../controllers/categoria.controller');

// Rutas CRUD para categorías
router.get('/', CategoriaController.getAllCategorias);
router.get('/:id', CategoriaController.getCategoriaById);
router.post('/', CategoriaController.createCategoria);
router.put('/:id', CategoriaController.updateCategoria);
router.delete('/:id', CategoriaController.deleteCategoria);

module.exports = router;
