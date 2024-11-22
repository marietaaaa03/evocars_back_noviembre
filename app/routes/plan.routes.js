const express = require('express');
const router = express.Router();
const PlanController = require('../controllers/plan.controller');

// Rutas CRUD para planes
router.get('/', PlanController.getAll);
router.get('/:id_plan', PlanController.getById);
router.post('/', PlanController.create);
router.put('/:id_plan', PlanController.update);
router.delete('/:id_plan', PlanController.delete);

module.exports = router;
