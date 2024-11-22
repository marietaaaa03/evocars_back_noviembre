const Notificacion = require('../models/notificacion');
const socket = require('../config/socket');

class NotificacionService {
  async crearNotificacion(datos) {
    try {
      const notificacion = await Notificacion.crear(datos);
      // Emitir notificación en tiempo real
      socket.io.to(`user_${datos.id_usuario}`).emit('nueva_notificacion', notificacion);
      return notificacion;
    } catch (error) {
      console.error('Error en servicio de notificaciones:', error);
      throw error;
    }
  }

  async crearNotificacionReserva(reserva, tipo) {
    const notificacionesConfig = {
      nueva_reserva: {
        titulo: 'Nueva Reserva Confirmada',
        mensaje: `Reserva confirmada para el auto ${reserva.modelo} del ${reserva.fecha_inicio} al ${reserva.fecha_fin}`
      },
      cancelacion_reserva: {
        titulo: 'Reserva Cancelada',
        mensaje: `La reserva del auto ${reserva.modelo} ha sido cancelada`
      },
      pago_recibido: {
        titulo: 'Pago Recibido',
        mensaje: `Se ha recibido el pago de $${reserva.precio_total} por la reserva`
      }
    };

    const config = notificacionesConfig[tipo];
    return await this.crearNotificacion({
      id_usuario: reserva.id_usuario,
      tipo,
      titulo: config.titulo,
      mensaje: config.mensaje,
      id_relacionado: reserva.id_reserva
    });
  }
}