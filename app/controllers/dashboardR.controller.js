// dashboardR.controller.js
const DashboardRModel = require('../models/dashboardR.model');

const DashboardRController = {
    async getAllStats(req, res) {
        try {
            const id_usuario = req.params.id_usuario;
            const año = req.query.año || new Date().getFullYear();
            
            const dashboardData = {};

            try {
                const [
                    rentasTotales,
                    ingresosTotales,
                    rentasPorMes,
                    ingresosPorMes,
                    rentasPorCategoria,
                    gananciasComisiones,
                    rendimientoPorSucursal,
                    topAutosRentados,
                    duracionRentas,
                    estadisticasCancelaciones,
                    promedios,
                    topCupones,
                    cuponesStats,
                    cuponesPorMes
                ] = await Promise.all([
                    DashboardRModel.getRentasTotales(id_usuario),
                    DashboardRModel.getIngresosTotales(id_usuario),
                    DashboardRModel.getRentasPorMes(id_usuario, año),
                    DashboardRModel.getIngresosPorMes(id_usuario, año),
                    DashboardRModel.getRentasPorCategoria(id_usuario),
                    DashboardRModel.getGananciasYComisiones(id_usuario),
                    DashboardRModel.getRendimientoPorSucursal(id_usuario),
                    DashboardRModel.getTopAutosRentados(id_usuario),
                    DashboardRModel.getDuracionRentas(id_usuario),
                    DashboardRModel.getEstadisticasCancelaciones(id_usuario),
                    DashboardRModel.getPromedios(id_usuario),
                    DashboardRModel.getTopCupones(id_usuario),
                    DashboardRModel.getCuponesStats(id_usuario),
                    DashboardRModel.getCuponesPorMes(id_usuario, año)
                ]);

                dashboardData.rentasTotales = rentasTotales;
                dashboardData.ingresosTotales = ingresosTotales;
                dashboardData.rentasPorMes = rentasPorMes;
                dashboardData.ingresosPorMes = ingresosPorMes;
                dashboardData.rentasPorCategoria = rentasPorCategoria;
                dashboardData.gananciasComisiones = gananciasComisiones;
                dashboardData.rendimientoPorSucursal = rendimientoPorSucursal;
                dashboardData.topAutosRentados = topAutosRentados;
                dashboardData.duracionRentas = duracionRentas;
                dashboardData.estadisticasCancelaciones = estadisticasCancelaciones;
                dashboardData.promedios = promedios;
                dashboardData.topCupones = topCupones;
                dashboardData.cuponesStats = cuponesStats;
                dashboardData.cuponesPorMes = cuponesPorMes;

            } catch (error) {
                console.error('Error al obtener estadísticas:', error);
                throw error;
            }

            res.json(dashboardData);
        } catch (error) {
            console.error('Error general en getAllStats:', error);
            res.status(500).json({ 
                message: 'Error al obtener las estadísticas del dashboard',
                error: error.message 
            });
        }
    }
};

module.exports = DashboardRController;
