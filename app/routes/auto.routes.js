const express = require('express');
const router = express.Router();
const AutoController = require('../controllers/auto.controller');

// Rutas CRUD para autos
router.get('/ofertavend/:id_usuario', AutoController.getAutoByIdDetailedOf);
router.get('/', AutoController.getAllAutosDetailed);
router.get('/producto/:id', AutoController.getAutoById);
router.post('/', AutoController.createAuto);
router.put('/:id', AutoController.updateAuto);
router.delete('/:id', AutoController.deleteAuto);

//Para tienda
router.get('/detailed', AutoController.getAllAutosDetailed);
router.get('/detailed/:id', AutoController.getAutoByIdDetailed);
router.get('/usuario/:id_usuario', AutoController.getAutosByUserId);




module.exports = router;
