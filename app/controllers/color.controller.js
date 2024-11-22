const ColorModel = require('../models/color');

class ColorController {
  // Obtener todos los colores
  static getAllColors(req, res) {
    ColorModel.getAll()
      .then(colores => res.json(colores))
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Obtener un color por ID
  static getColorById(req, res) {
    ColorModel.getById(req.params.id)
      .then(color => {
        if (!color) {
          return res.status(404).json({ message: 'Color no encontrado' });
        }
        res.json(color);
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Crear un nuevo color
  static createColor(req, res) {
    ColorModel.create(req.body)
      .then(color => res.status(201).json(color))
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Actualizar un color por ID
  static updateColor(req, res) {
    ColorModel.update(req.params.id, req.body)
      .then(color => {
        if (!color) {
          return res.status(404).json({ message: 'Color no encontrado' });
        }
        res.json({ message: 'Color actualizado', color });
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Eliminar un color por ID
  static deleteColor(req, res) {
    ColorModel.delete(req.params.id)
      .then(result => {
        if (!result) {
          return res.status(404).json({ message: 'Color no encontrado' });
        }
        res.json({ message: 'Color eliminado' });
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }
}

module.exports = ColorController;
