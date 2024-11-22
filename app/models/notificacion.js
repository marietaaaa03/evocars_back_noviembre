// models/notificacion.js

const sql = require('../config/db');  // Ajusta la ruta según tu estructura

// Definición del modelo
class Notificacion {
  constructor() {
    // Asegurarse de que la tabla existe
    this.initTable();
  }

  async initTable() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS notificaciones (
        id BIGINT NOT NULL AUTO_INCREMENT,
        id_usuario BIGINT NOT NULL,
        tipo VARCHAR(50) NOT NULL,
        titulo VARCHAR(100) NOT NULL,
        mensaje TEXT NOT NULL,
        id_relacionado BIGINT,
        leido BOOLEAN DEFAULT false,
        fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
      )
    `;

    try {
      await sql.query(createTableQuery);
      console.log('Tabla de notificaciones inicializada correctamente');
    } catch (error) {
      console.error('Error al inicializar tabla de notificaciones:', error);
      throw error;
    }
  }

  // Métodos del modelo
  async crear(notificacion) {
    const query = `
      INSERT INTO notificaciones 
      (id_usuario, tipo, titulo, mensaje, id_relacionado)
      VALUES (?, ?, ?, ?, ?)
    `;

    try {
      const result = await sql.query(query, [
        notificacion.id_usuario,
        notificacion.tipo,
        notificacion.titulo,
        notificacion.mensaje,
        notificacion.id_relacionado
      ]);
      return result;
    } catch (error) {
      console.error('Error al crear notificación:', error);
      throw error;
    }
  }

  async obtenerPorUsuario(idUsuario) {
    const query = `
      SELECT * FROM notificaciones 
      WHERE id_usuario = ?
      ORDER BY fecha_creacion DESC
    `;

    try {
      const [notificaciones] = await sql.query(query, [idUsuario]);
      return notificaciones;
    } catch (error) {
      console.error('Error al obtener notificaciones:', error);
      throw error;
    }
  }

  async marcarComoLeida(id) {
    const query = `
      UPDATE notificaciones
      SET leido = true
      WHERE id = ?
    `;

    try {
      const result = await sql.query(query, [id]);
      return result;
    } catch (error) {
      console.error('Error al marcar notificación como leída:', error);
      throw error;
    }
  }

  async eliminar(id) {
    const query = `
      DELETE FROM notificaciones
      WHERE id = ?
    `;

    try {
      const result = await sql.query(query, [id]);
      return result;
    } catch (error) {
      console.error('Error al eliminar notificación:', error);
      throw error;
    }
  }

  async obtenerNoLeidas(idUsuario) {
    const query = `
      SELECT * FROM notificaciones
      WHERE id_usuario = ? AND leido = false
      ORDER BY fecha_creacion DESC
    `;

    try {
      const [notificaciones] = await sql.query(query, [idUsuario]);
      return notificaciones;
    } catch (error) {
      console.error('Error al obtener notificaciones no leídas:', error);
      throw error;
    }
  }
}

module.exports = new Notificacion();