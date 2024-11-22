//dashboardA.controller.js

const DashboardAModel = require('../models/dashboardA.model'); // Ajusta la ruta si es necesario

class DashboardAController {
  // Obtener todas las estadísticas del dashboard
  static async getAllStats(req, res) {
    try {
      const año = req.query.año || new Date().getFullYear();
      
      const [
        totalAutos,
        autosPorCategoria,
        autosConOfertas,
        ingresosPorMes,
        comisionesPorMes,
        comisionesPorAño,
        ingresosPorSucursal,
        comisionesPorSucursal,
        usuariosPorMesYRol,
        cuponesMasUsados
      ] = await Promise.all([
        DashboardAModel.getTotalAutos(),
        DashboardAModel.getAutosPorCategoria(),
        DashboardAModel.getAutosConOfertas(),
        DashboardAModel.getIngresosPorMes(año),
        DashboardAModel.getComisionesPorMes(año),
        DashboardAModel.getComisionesPorAño(),
        DashboardAModel.getIngresosPorSucursal(),
        DashboardAModel.getComisionesPorSucursal(),
        DashboardAModel.getUsuariosPorMesYRol(año),
        DashboardAModel.getCuponesMasUsados()
      ]);

      res.json({
        totalAutos,
        autosPorCategoria,
        autosConOfertas,
        ingresosPorMes,
        comisionesPorMes,
        comisionesPorAño,
        ingresosPorSucursal,
        comisionesPorSucursal,
        usuariosPorMesYRol,
        cuponesMasUsados
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Obtener total de autos
  static async getTotalAutos(req, res) {
    try {
      const total = await DashboardAModel.getTotalAutos();
      res.json(total);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Obtener autos por categoría
  static async getAutosPorCategoria(req, res) {
    try {
      const autos = await DashboardAModel.getAutosPorCategoria();
      res.json(autos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Obtener autos con ofertas activas
  static async getAutosConOfertas(req, res) {
    try {
      const autos = await DashboardAModel.getAutosConOfertas();
      res.json(autos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Obtener ingresos por mes
  static async getIngresosPorMes(req, res) {
    try {
      const año = req.query.año || new Date().getFullYear();
      const ingresos = await DashboardAModel.getIngresosPorMes(año);
      res.json(ingresos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Obtener comisiones por mes
  static async getComisionesPorMes(req, res) {
    try {
      const año = req.query.año || new Date().getFullYear();
      const comisiones = await DashboardAModel.getComisionesPorMes(año);
      res.json(comisiones);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Obtener comisiones por año
  static async getComisionesPorAño(req, res) {
    try {
      const comisiones = await DashboardAModel.getComisionesPorAño();
      res.json(comisiones);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Obtener ingresos por sucursal
  static async getIngresosPorSucursal(req, res) {
    try {
      const ingresos = await DashboardAModel.getIngresosPorSucursal();
      res.json(ingresos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Obtener comisiones por sucursal
  static async getComisionesPorSucursal(req, res) {
    try {
      const comisiones = await DashboardAModel.getComisionesPorSucursal();
      res.json(comisiones);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Obtener usuarios por mes y rol
  static async getUsuariosPorMesYRol(req, res) {
    try {
      const año = req.query.año || new Date().getFullYear();
      const usuarios = await DashboardAModel.getUsuariosPorMesYRol(año);
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Agregar nuevo método para cupones más usados
  static async getCuponesMasUsados(req, res) {
    try {
      const cupones = await DashboardAModel.getCuponesMasUsados();
      res.json(cupones);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = DashboardAController;