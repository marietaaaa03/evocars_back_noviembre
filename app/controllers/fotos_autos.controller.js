const FotoAutoModel = require('../models/fotos_autos');

class FotoAutoController {
  // Obtener todas las fotos de autos
  static getAllFotos(req, res) {
    FotoAutoModel.getAll()
      .then(fotos => res.json(fotos))
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Obtener una foto de auto por ID
  static getFotoById(req, res) {
    FotoAutoModel.getById(req.params.id)
      .then(foto => {
        if (!foto) {
          return res.status(404).json({ message: 'Foto no encontrada' });
        }
        res.json(foto);
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Obtener todas las fotos de un auto por ID de auto
  static getFotosByAutoId(req, res) {
    FotoAutoModel.getByAutoId(req.params.id_auto)
      .then(fotos => res.json(fotos))
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Crear una nueva foto para un auto
  static createFoto(req, res) {
    FotoAutoModel.create(req.body)
      .then(foto => res.status(201).json(foto))
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Actualizar una foto de auto por ID
  static updateFoto(req, res) {
    FotoAutoModel.update(req.params.id, req.body)
      .then(foto => {
        if (!foto) {
          return res.status(404).json({ message: 'Foto no encontrada' });
        }
        res.json({ message: 'Foto actualizada', foto });
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Eliminar una foto de auto por ID
  static deleteFoto(req, res) {
    FotoAutoModel.delete(req.params.id)
      .then(result => {
        if (!result) {
          return res.status(404).json({ message: 'Foto no encontrada' });
        }
        res.json({ message: 'Foto eliminada' });
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }
}

module.exports = FotoAutoController;
