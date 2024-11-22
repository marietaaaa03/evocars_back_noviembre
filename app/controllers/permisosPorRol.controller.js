const PermisosPorRolModel = require('../models/permisosPorRol');

class PermisosPorRolController {
  // Obtener todas las asociaciones rol-permiso
  static getAll(req, res) {
    PermisosPorRolModel.getAll()
      .then(asociaciones => res.json(asociaciones))
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Obtener una asociación rol-permiso por IDs
  static getByIds(req, res) {
    PermisosPorRolModel.getByIds(req.params.id_rol, req.params.id_permiso)
      .then(asociacion => {
        if (!asociacion) {
          return res.status(404).json({ message: 'Asociación no encontrada' });
        }
        res.json(asociacion);
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Crear una nueva asociación rol-permiso
  static create(req, res) {
    PermisosPorRolModel.create(req.body)
      .then(asociacion => res.status(201).json(asociacion))
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Actualizar una asociación rol-permiso por IDs
  static update(req, res) {
    PermisosPorRolModel.update(req.params.id_rol, req.params.id_permiso, req.body)
      .then(asociacion => {
        if (!asociacion) {
          return res.status(404).json({ message: 'Asociación no encontrada' });
        }
        res.json({ message: 'Asociación actualizada', asociacion });
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Eliminar una asociación rol-permiso por IDs
  static delete(req, res) {
    PermisosPorRolModel.delete(req.params.id_rol, req.params.id_permiso)
      .then(result => {
        if (!result) {
          return res.status(404).json({ message: 'Asociación no encontrada' });
        }
        res.json({ message: 'Asociación eliminada' });
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }
}

module.exports = PermisosPorRolController;
