const CategoriaModel = require('../models/categoria');

class CategoriaController {
  // Obtener todas las categorías
  static getAllCategorias(req, res) {
    CategoriaModel.getAll()
      .then(categorias => res.json(categorias))
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Obtener una categoría por ID
  static getCategoriaById(req, res) {
    CategoriaModel.getById(req.params.id)
      .then(categoria => {
        if (!categoria) {
          return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.json(categoria);
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Crear una nueva categoría
  static createCategoria(req, res) {
    CategoriaModel.create(req.body)
      .then(categoria => res.status(201).json(categoria))
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Actualizar una categoría por ID
  static updateCategoria(req, res) {
    CategoriaModel.update(req.params.id, req.body)
      .then(categoria => {
        if (!categoria) {
          return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.json({ message: 'Categoría actualizada', categoria });
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Eliminar una categoría por ID
  static deleteCategoria(req, res) {
    CategoriaModel.delete(req.params.id)
      .then(result => {
        if (!result) {
          return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.json({ message: 'Categoría eliminada' });
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }
}

module.exports = CategoriaController;
