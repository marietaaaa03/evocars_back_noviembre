const CuponModel = require('../models/cupon');

class CuponController {
  // Obtener todos los cupones
  static getAllCupones(req, res) {
    CuponModel.getAll()
      .then(cupones => res.json(cupones))
      .catch(error => res.status(500).json({ message: error.message }));
  }

    // Obtener todos los cupones de un usuario específico
    static getCuponesByUserId(req, res) {
      CuponModel.getByUserId(req.params.id_usuario)
        .then(cupones => {
          if (!cupones.length) {
            return res.status(404).json({ message: 'No se encontraron cupones para este usuario' });
          }
          res.json(cupones);
        })
        .catch(error => res.status(500).json({ message: error.message }));
    }

  // Obtener un cupón por ID
  static getCuponById(req, res) {
    CuponModel.getById(req.params.id)
      .then(cupon => {
        if (!cupon) {
          return res.status(404).json({ message: 'Cupón no encontrado' });
        }
        res.json(cupon);
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Crear un nuevo cupón
  static createCupon(req, res) {
    CuponModel.create(req.body)
      .then(cupon => res.status(201).json(cupon))
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Actualizar un cupón por ID
  static updateCupon(req, res) {
    CuponModel.update(req.params.id, req.body)
      .then(cupon => {
        if (!cupon) {
          return res.status(404).json({ message: 'Cupón no encontrado' });
        }
        res.json({ message: 'Cupón actualizado', cupon });
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Eliminar un cupón por ID
  static deleteCupon(req, res) {
    CuponModel.delete(req.params.id)
      .then(result => {
        if (!result) {
          return res.status(404).json({ message: 'Cupón no encontrado' });
        }
        res.json({ message: 'Cupón eliminado' });
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }
}

module.exports = CuponController;
