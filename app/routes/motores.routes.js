const express = require('express');
const router = express.Router();
const MotorController = require('../controllers/motores.controller');

// Rutas CRUD para motores
router.get('/', MotorController.getAllMotores);
router.get('/:id', MotorController.getMotorById);
router.post('/', MotorController.createMotor);
router.put('/:id', MotorController.updateMotor);
router.delete('/:id', MotorController.deleteMotor);

module.exports = router;
