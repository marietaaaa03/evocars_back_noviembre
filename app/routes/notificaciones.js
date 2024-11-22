const express = require('express');
const router = express.Router();
const NotificacionController = require('../controllers/notificacionController');
const auth = require('../middleware/auth');

// Instanciar controlador
const notificacionController = new NotificacionController();

// Obtener todas las notificaciones de un usuario
router.get('/:id_usuario', auth, notificacionController.obtenerNotificaciones);

// Obtener notificaciones no leídas
router.get('/:id_usuario/no-leidas', auth, async (req, res) => {
  try {
    const notificaciones = await Notificacion.obtenerNoLeidas(req.params.id_usuario);
    res.json(notificaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Marcar notificación como leída
router.put('/:id/leer', auth, notificacionController.marcarComoLeida);

// Eliminar notificación
router.delete('/:id', auth, async (req, res) => {
  try {
    await Notificacion.eliminar(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar todas las notificaciones de un usuario
router.delete('/usuario/:id_usuario', auth, async (req, res) => {
  try {
    const query = 'DELETE FROM notificaciones WHERE id_usuario = ?';
    await sql.query(query, [req.params.id_usuario]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;