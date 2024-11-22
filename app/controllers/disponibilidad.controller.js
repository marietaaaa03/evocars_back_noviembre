const DisponibilidadModel = require('../models/disponibilidad');

class DisponibilidadController {
  // Obtener todas las disponibilidades
  static getAllDisponibilidades(req, res) {
    DisponibilidadModel.getAll()
      .then(disponibilidades => res.json(disponibilidades))
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Obtener disponibilidad por ID
  static getDisponibilidadById(req, res) {
    DisponibilidadModel.getById(req.params.id)
      .then(disponibilidad => {
        if (!disponibilidad) {
          return res.status(404).json({ message: 'Registro no encontrado' });
        }
        res.json(disponibilidad);
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Crear una nueva disponibilidad
  static createDisponibilidad(req, res) {
    DisponibilidadModel.create(req.body)
      .then(disponibilidad => res.status(201).json(disponibilidad))
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Actualizar una disponibilidad por ID
  static updateDisponibilidad(req, res) {
    DisponibilidadModel.update(req.params.id, req.body)
      .then(disponibilidad => {
        if (!disponibilidad) {
          return res.status(404).json({ message: 'Registro no encontrado' });
        }
        res.json({ message: 'Registro actualizado', disponibilidad });
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Eliminar una disponibilidad por ID
  static deleteDisponibilidad(req, res) {
    DisponibilidadModel.delete(req.params.id)
      .then(result => {
        if (!result) {
          return res.status(404).json({ message: 'Registro no encontrado' });
        }
        res.json({ message: 'Registro eliminado' });
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }
}

module.exports = DisponibilidadController;
