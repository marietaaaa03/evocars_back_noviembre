//dashboardA.routes.js

const express = require('express');
const router = express.Router();
const DashboardAController = require('../controllers/dashboardA.controller');

// Ruta para obtener todas las estadísticas
router.get('/stats', DashboardAController.getAllStats);

// Rutas individuales para cada estadística
router.get('/total-autos', DashboardAController.getTotalAutos);
router.get('/autos-por-categoria', DashboardAController.getAutosPorCategoria);
router.get('/autos-con-ofertas', DashboardAController.getAutosConOfertas);
router.get('/ingresos-por-mes', DashboardAController.getIngresosPorMes);
router.get('/comisiones-por-mes', DashboardAController.getComisionesPorMes);
router.get('/comisiones-por-año', DashboardAController.getComisionesPorAño);
router.get('/ingresos-por-sucursal', DashboardAController.getIngresosPorSucursal);
router.get('/comisiones-por-sucursal', DashboardAController.getComisionesPorSucursal);
router.get('/usuarios-por-mes-rol', DashboardAController.getUsuariosPorMesYRol);
router.get('/cupones-mas-usados', DashboardAController.getCuponesMasUsados);

module.exports = router;
  