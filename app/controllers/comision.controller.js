const ComisionModel = require('../models/comision');

class ComisionController {
  // Obtener todas las comisiones
  static getAllComisiones(req, res) {
    ComisionModel.getAll()
      .then(comisiones => res.json(comisiones))
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Obtener una comisión por ID
  static getComisionById(req, res) {
    ComisionModel.getById(req.params.id)
      .then(comision => {
        if (!comision) {
          return res.status(404).json({ message: 'Comisión no encontrada' });
        }
        res.json(comision);
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Crear una nueva comisión
  static createComision(req, res) {
    ComisionModel.create(req.body)
      .then(comision => res.status(201).json(comision))
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Actualizar una comisión por ID
  static updateComision(req, res) {
    ComisionModel.update(req.params.id, req.body)
      .then(comision => {
        if (!comision) {
          return res.status(404).json({ message: 'Comisión no encontrada' });
        }
        res.json({ message: 'Comisión actualizada', comision });
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Eliminar una comisión por ID
  static deleteComision(req, res) {
    ComisionModel.delete(req.params.id)
      .then(result => {
        if (!result) {
          return res.status(404).json({ message: 'Comisión no encontrada' });
        }
        res.json({ message: 'Comisión eliminada' });
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }
}

module.exports = ComisionController;
