const express = require('express');
const router = express.Router();
const PermisosPorRolController = require('../controllers/permisosPorRol.controller');

// Rutas CRUD para permisos por rol
router.get('/', PermisosPorRolController.getAll);
router.get('/:id_rol/:id_permiso', PermisosPorRolController.getByIds);
router.post('/', PermisosPorRolController.create);
router.put('/:id_rol/:id_permiso', PermisosPorRolController.update);
router.delete('/:id_rol/:id_permiso', PermisosPorRolController.delete);

module.exports = router;
