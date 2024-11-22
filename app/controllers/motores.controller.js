const MotorModel = require('../models/motores');

class MotorController {
  // Obtener todos los motores
  static getAllMotores(req, res) {
    MotorModel.getAll()
      .then(motores => res.json(motores))
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Obtener un motor por ID
  static getMotorById(req, res) {
    MotorModel.getById(req.params.id)
      .then(motor => {
        if (!motor) {
          return res.status(404).json({ message: 'Motor no encontrado' });
        }
        res.json(motor);
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Crear un nuevo motor
  static createMotor(req, res) {
    MotorModel.create(req.body)
      .then(motor => res.status(201).json(motor))
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Actualizar un motor por ID
  static updateMotor(req, res) {
    MotorModel.update(req.params.id, req.body)
      .then(motor => {
        if (!motor) {
          return res.status(404).json({ message: 'Motor no encontrado' });
        }
        res.json({ message: 'Motor actualizado', motor });
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Eliminar un motor por ID
  static deleteMotor(req, res) {
    MotorModel.delete(req.params.id)
      .then(result => {
        if (!result) {
          return res.status(404).json({ message: 'Motor no encontrado' });
        }
        res.json({ message: 'Motor eliminado' });
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }
}

module.exports = MotorController;
