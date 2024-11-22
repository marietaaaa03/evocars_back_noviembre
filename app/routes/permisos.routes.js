const express = require('express');
const router = express.Router();
const PermisoController = require('../controllers/permisos.controller');

// Rutas CRUD para permisos
router.get('/', PermisoController.getAllPermisos);
router.get('/:id', PermisoController.getPermisoById);
router.post('/', PermisoController.createPermiso);
router.put('/:id', PermisoController.updatePermiso);
router.delete('/:id', PermisoController.deletePermiso);

module.exports = router;
