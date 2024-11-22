const PermisoModel = require('../models/permisos');

class PermisoController {
  // Obtener todos los permisos
  static getAllPermisos(req, res) {
    PermisoModel.getAll()
      .then(permisos => res.json(permisos))
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Obtener un permiso por ID
  static getPermisoById(req, res) {
    PermisoModel.getById(req.params.id)
      .then(permiso => {
        if (!permiso) {
          return res.status(404).json({ message: 'Permiso no encontrado' });
        }
        res.json(permiso);
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Crear un nuevo permiso
  static createPermiso(req, res) {
    PermisoModel.create(req.body)
      .then(permiso => res.status(201).json(permiso))
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Actualizar un permiso por ID
  static updatePermiso(req, res) {
    PermisoModel.update(req.params.id, req.body)
      .then(permiso => {
        if (!permiso) {
          return res.status(404).json({ message: 'Permiso no encontrado' });
        }
        res.json({ message: 'Permiso actualizado', permiso });
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Eliminar un permiso por ID
  static deletePermiso(req, res) {
    PermisoModel.delete(req.params.id)
      .then(result => {
        if (!result) {
          return res.status(404).json({ message: 'Permiso no encontrado' });
        }
        res.json({ message: 'Permiso eliminado' });
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }
}

module.exports = PermisoController;
