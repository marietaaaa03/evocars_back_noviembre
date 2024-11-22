const NotificacionService = require('../services/notificacionService');
const service = new NotificacionService();

class NotificacionController {
  async obtenerNotificaciones(req, res) {
    try {
      const { id_usuario, rol } = req.params;
      const notificaciones = await Notificacion.obtenerPorUsuario(id_usuario);
      res.json(notificaciones);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async marcarComoLeida(req, res) {
    try {
      const { id } = req.params;
      await Notificacion.marcarComoLeida(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}