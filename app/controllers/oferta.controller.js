const OfertaModel = require('../models/oferta');

class OfertaController {
  // Obtener todas las ofertas
  static getAllOfertas(req, res) {
    OfertaModel.getAll()
      .then(ofertas => res.json(ofertas))
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Obtener una oferta por ID
  static getOfertaById(req, res) {
    OfertaModel.getById(req.params.id)
      .then(oferta => {
        if (!oferta) {
          return res.status(404).json({ message: 'Oferta no encontrada' });
        }
        res.json(oferta);
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }

    // Obtener una oferta por ID
    static getOfertaByIdAuto(req, res) {
      OfertaModel.getByIdAuto(req.params.id_auto)
        .then(oferta => {
          if (!oferta) {
            return res.status(404).json({ message: 'Oferta no encontrada' });
          }
          res.json(oferta);
        })
        .catch(error => res.status(500).json({ message: error.message }));
    }

  // Crear una nueva oferta
  static createOferta(req, res) {
    OfertaModel.create(req.body)
      .then(oferta => res.status(201).json(oferta))
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Actualizar una oferta por ID
  static updateOferta(req, res) {
    OfertaModel.update(req.params.id, req.body)
      .then(oferta => {
        if (!oferta) {
          return res.status(404).json({ message: 'Oferta no encontrada' });
        }
        res.json({ message: 'Oferta actualizada', oferta });
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Eliminar una oferta por ID
  static deleteOferta(req, res) {
    OfertaModel.delete(req.params.id)
      .then(result => {
        if (!result) {
          return res.status(404).json({ message: 'Oferta no encontrada' });
        }
        res.json({ message: 'Oferta eliminada' });
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }
}

module.exports = OfertaController;
