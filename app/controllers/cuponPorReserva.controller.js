const CuponPorReservaModel = require('../models/cuponPorReserva');

class CuponPorReservaController {
  // Obtener todos los cupones por reserva
  static getAllCuponesPorReserva(req, res) {
    CuponPorReservaModel.getAll()
      .then(cuponesPorReserva => res.json(cuponesPorReserva))
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Obtener un cupón por reserva por ID de cupón y reserva
  static getCuponPorReservaById(req, res) {
    CuponPorReservaModel.getById(req.params.id_cupon, req.params.id_reserva)
      .then(cuponPorReserva => {
        if (!cuponPorReserva) {
          return res.status(404).json({ message: 'Registro no encontrado' });
        }
        res.json(cuponPorReserva);
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Crear un nuevo registro de cupón por reserva
  static createCuponPorReserva(req, res) {
    CuponPorReservaModel.create(req.body)
      .then(cuponPorReserva => res.status(201).json(cuponPorReserva))
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Actualizar un registro de cupón por reserva
  static updateCuponPorReserva(req, res) {
    CuponPorReservaModel.update(req.params.id_cupon, req.params.id_reserva, req.body)
      .then(cuponPorReserva => {
        if (!cuponPorReserva) {
          return res.status(404).json({ message: 'Registro no encontrado' });
        }
        res.json({ message: 'Registro actualizado', cuponPorReserva });
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Eliminar un registro de cupón por reserva
  static deleteCuponPorReserva(req, res) {
    CuponPorReservaModel.delete(req.params.id_cupon, req.params.id_reserva)
      .then(result => {
        if (!result) {
          return res.status(404).json({ message: 'Registro no encontrado' });
        }
        res.json({ message: 'Registro eliminado' });
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }
}

module.exports = CuponPorReservaController;
