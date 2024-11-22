const RentaModel = require('../models/renta');

class RentaController {
  // Obtener todas las rentas
  static getAll(req, res) {
    RentaModel.getAll()
      .then(rentas => res.json(rentas))
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Obtener una renta por ID
  static getById(req, res) {
    RentaModel.getById(req.params.id_reserva)
      .then(renta => {
        if (!renta) {
          return res.status(404).json({ message: 'Renta no encontrada' });
        }
        res.json(renta);
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Crear una nueva renta
  static create(req, res) {
    RentaModel.create(req.body)
      .then(renta => res.status(201).json(renta))
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Actualizar una renta por ID
  static update(req, res) {
    RentaModel.update(req.params.id_reserva, req.body)
      .then(renta => {
        if (!renta) {
          return res.status(404).json({ message: 'Renta no encontrada' });
        }
        res.json({ message: 'Renta actualizada', renta });
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Eliminar una renta por ID
  static delete(req, res) {
    RentaModel.delete(req.params.id_reserva)
      .then(result => {
        if (!result) {
          return res.status(404).json({ message: 'Renta no encontrada' });
        }
        res.json({ message: 'Renta eliminada' });
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }
}

module.exports = RentaController;
