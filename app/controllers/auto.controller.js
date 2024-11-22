const AutoModel = require('../models/auto');

class AutoController {


  
   // Obtener un auto por ID con información detallada y fotos
   static getAutoByIdDetailed(req, res) {
    console.log("holaaaaa");
    AutoModel.getByIdDetailed(req.params.id)
      .then(auto => {
        if (!auto) {
          return res.status(404).json({ message: 'Auto no encontrado' });
        }
        res.json(auto);
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }

     // Obtener un auto por ID con información detallada y ofertas
     static getAutoByIdDetailedOf(req, res) {
      AutoModel.getByUserIdOf(req.params.id_usuario)
        .then(auto => {
          if (!auto) {
            return res.status(404).json({ message: 'Auto no encontrado' });
          }
          res.json(auto);
        })
        .catch(error => res.status(500).json({ message: error.message }));
    }


  // Obtener autos por id_usuario con información detallada
static getAutosByUserId(req, res) {
  AutoModel.getByUserIdDetailed(req.params.id_usuario)
    .then(autos => {
      if (!autos.length) {
        return res.status(404).json({ message: 'No se encontraron autos para este usuario' });
      }
      res.json(autos);
    })
    .catch(error => res.status(500).json({ message: error.message }));
}

    // Obtener todos los autos con información detallada
    static getAllAutosDetailed(req, res) {
      console.log("hola");
      AutoModel.getAllDetailed()
        .then(autos => res.json(autos))
        .catch(error => res.status(500).json({ message: error.message }));
    }

  // Obtener todos los autos
  static getAllAutos(req, res) {
    AutoModel.getAll()
      .then(autos => res.json(autos))
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Obtener un auto por ID
  static getAutoById(req, res) {
    AutoModel.getById(req.params.id)
      .then(auto => {
        if (!auto) {
          return res.status(404).json({ message: 'Auto no encontrado' });
        }
        res.json(auto);
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Crear un nuevo auto
  static createAuto(req, res) {
    AutoModel.create(req.body)
      .then(auto => res.status(201).json(auto))
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Actualizar un auto por ID
  static updateAuto(req, res) {
    AutoModel.update(req.params.id, req.body)
      .then(auto => {
        if (!auto) {
          return res.status(404).json({ message: 'Auto no encontrado' });
        }
        res.json({ message: 'Auto actualizado', auto });
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Eliminar un auto por ID
  static deleteAuto(req, res) {
    AutoModel.delete(req.params.id)
      .then(result => {
        if (!result) {
          return res.status(404).json({ message: 'Auto no encontrado' });
        }
        res.json({ message: 'Auto eliminado' });
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }
}

module.exports = AutoController;
