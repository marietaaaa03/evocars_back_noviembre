const CuponPorVendedorModel = require('../models/cuponPorVendedor');

class CuponPorVendedorController {
  // Obtener todos los cupones por vendedor
  static getAllCuponesPorVendedor(req, res) {
    CuponPorVendedorModel.getAll()
      .then(cuponesPorVendedor => res.json(cuponesPorVendedor))
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Obtener un cupón por vendedor por ID de cupón y usuario
  static getCuponPorVendedorById(req, res) {
    CuponPorVendedorModel.getById(req.params.id_cupon, req.params.id_usuario)
      .then(cuponPorVendedor => {
        if (!cuponPorVendedor) {
          return res.status(404).json({ message: 'Registro no encontrado' });
        }
        res.json(cuponPorVendedor);
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Crear un nuevo registro de cupón por vendedor
  static createCuponPorVendedor(req, res) {
    CuponPorVendedorModel.create(req.body)
      .then(cuponPorVendedor => res.status(201).json(cuponPorVendedor))
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Actualizar un registro de cupón por vendedor
  static updateCuponPorVendedor(req, res) {
    CuponPorVendedorModel.update(req.params.id_cupon, req.params.id_usuario, req.body)
      .then(cuponPorVendedor => {
        if (!cuponPorVendedor) {
          return res.status(404).json({ message: 'Registro no encontrado' });
        }
        res.json({ message: 'Registro actualizado', cuponPorVendedor });
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }

  // Eliminar un registro de cupón por vendedor
  static deleteCuponPorVendedor(req, res) {
    CuponPorVendedorModel.delete(req.params.id_cupon, req.params.id_usuario)
      .then(result => {
        if (!result) {
          return res.status(404).json({ message: 'Registro no encontrado' });
        }
        res.json({ message: 'Registro eliminado' });
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }
}

module.exports = CuponPorVendedorController;
