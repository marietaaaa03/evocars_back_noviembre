const SucursalModel = require('../models/sucursal');

class SucursalController {
  // Obtener todas las sucursales
  static getAllSucursales(req, res) {
    SucursalModel.getAll()
      .then(sucursales => res.json(sucursales))
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Obtener una sucursal por ID
  static getSucursalById(req, res) {
    SucursalModel.getById(req.params.id)
      .then(sucursal => {
        if (!sucursal) {
          return res.status(404).json({ message: 'Sucursal no encontrada' });
        }
        res.json(sucursal);
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Crear una nueva sucursal
  static createSucursal(req, res) {
    SucursalModel.create(req.body)
      .then(sucursal => res.status(201).json(sucursal))
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Actualizar una sucursal por ID
  static updateSucursal(req, res) {
    SucursalModel.update(req.params.id, req.body)
      .then(sucursal => {
        if (!sucursal) {
          return res.status(404).json({ message: 'Sucursal no encontrada' });
        }
        res.json({ message: 'Sucursal actualizada', sucursal });
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Eliminar una sucursal por ID
  static deleteSucursal(req, res) {
    SucursalModel.delete(req.params.id)
      .then(result => {
        if (!result) {
          return res.status(404).json({ message: 'Sucursal no encontrada' });
        }
        res.json({ message: 'Sucursal eliminada' });
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }
}

module.exports = SucursalController;
