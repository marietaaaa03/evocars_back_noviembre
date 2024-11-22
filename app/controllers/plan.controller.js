const PlanModel = require('../models/plan');

class PlanController {
  // Obtener todos los planes
  static getAll(req, res) {
    PlanModel.getAll()
      .then(planes => res.json(planes))
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Obtener un plan por ID
  static getById(req, res) {
    PlanModel.getById(req.params.id_plan)
      .then(plan => {
        if (!plan) {
          return res.status(404).json({ message: 'Plan no encontrado' });
        }
        res.json(plan);
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Crear un nuevo plan
  static create(req, res) {
    PlanModel.create(req.body)
      .then(plan => res.status(201).json(plan))
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Actualizar un plan por ID
  static update(req, res) {
    PlanModel.update(req.params.id_plan, req.body)
      .then(plan => {
        if (!plan) {
          return res.status(404).json({ message: 'Plan no encontrado' });
        }
        res.json({ message: 'Plan actualizado', plan });
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Eliminar un plan por ID
  static delete(req, res) {
    PlanModel.delete(req.params.id_plan)
      .then(result => {
        if (!result) {
          return res.status(404).json({ message: 'Plan no encontrado' });
        }
        res.json({ message: 'Plan eliminado' });
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }
}

module.exports = PlanController;
