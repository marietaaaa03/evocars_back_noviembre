const express = require('express');
const router = express.Router();
const DashboardRController = require('../controllers/dashboardR.controller');

// Verificar que el controlador se está importando correctamente
console.log('Controlador:', DashboardRController);
console.log('Método getAllStats:', DashboardRController.getAllStats);

// Rutas principales
router.get('/stats/:id_usuario', async (req, res) => {
    try {
        await DashboardRController.getAllStats(req, res);
    } catch (error) {
        console.error('Error en la ruta /stats:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Rutas opcionales
router.get('/rentas-totales/:id_usuario', async (req, res) => {
    try {
        await DashboardRController.getRentasTotales(req, res);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/ingresos-totales/:id_usuario', async (req, res) => {
    try {
        await DashboardRController.getIngresosTotales(req, res);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/rentas-por-mes/:id_usuario', async (req, res) => {
    try {
        await DashboardRController.getRentasPorMes(req, res);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/rendimiento-sucursal/:id_usuario', async (req, res) => {
    try {
        const data = await DashboardRModel.getRendimientoPorSucursal(req.params.id_usuario);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/top-autos/:id_usuario', async (req, res) => {
    try {
        const limite = req.query.limite || 5;
        const data = await DashboardRModel.getTopAutosRentados(req.params.id_usuario, limite);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/duracion-rentas/:id_usuario', async (req, res) => {
    try {
        const data = await DashboardRModel.getDuracionRentas(req.params.id_usuario);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/cancelaciones/:id_usuario', async (req, res) => {
    try {
        const data = await DashboardRModel.getEstadisticasCancelaciones(req.params.id_usuario);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/promedios/:id_usuario', async (req, res) => {
    try {
        const data = await DashboardRModel.getPromedios(req.params.id_usuario);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/top-cupones/:id_usuario', async (req, res) => {
    try {
        const limite = req.query.limite || 5;
        const data = await DashboardRModel.getTopCupones(req.params.id_usuario, limite);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/cupones-stats/:id_usuario', async (req, res) => {
    try {
        const data = await DashboardRModel.getCuponesStats(req.params.id_usuario);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/cupones-por-mes/:id_usuario', async (req, res) => {
    try {
        const año = req.query.año || new Date().getFullYear();
        const data = await DashboardRModel.getCuponesPorMes(req.params.id_usuario, año);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;