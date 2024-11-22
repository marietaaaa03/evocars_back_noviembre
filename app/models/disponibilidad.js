const sql = require('./db');

// Constructor de Disponibilidad
const Disponibilidad = function(disponibilidad) {
  this.id_auto = disponibilidad.id_auto;
  this.fecha_inicio = disponibilidad.fecha_inicio;
  this.fecha_fin = disponibilidad.fecha_fin;
  this.estado = disponibilidad.estado;
  this.id_sucursal = disponibilidad.id_sucursal;
};

// Crear un nuevo registro de disponibilidad
Disponibilidad.create = (newDisponibilidad) => {
  return new Promise((resolve, reject) => {
    sql.query("INSERT INTO disponibilidad SET ?", newDisponibilidad, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ id_disponibilidad: res.insertId, ...newDisponibilidad });
    });
  });
};

// Obtener todos los registros de disponibilidad
Disponibilidad.getAll = () => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM disponibilidad", (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
};

// Obtener un registro de disponibilidad por ID
Disponibilidad.getById = (id) => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM disponibilidad WHERE id_disponibilidad = ?", [id], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.length) {
        resolve(res[0]);
      } else {
        resolve(null); // No se encontró el registro
      }
    });
  });
};

// Actualizar un registro de disponibilidad
Disponibilidad.update = (id, disponibilidad) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE disponibilidad SET ? WHERE id_disponibilidad = ?`;
    sql.query(query, [disponibilidad, id], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.affectedRows == 0) {
        resolve(null); // No se encontró el registro
        return;
      }
      resolve({ id_disponibilidad: id, ...disponibilidad });
    });
  });
};

// Eliminar un registro de disponibilidad
Disponibilidad.delete = (id) => {
  return new Promise((resolve, reject) => {
    sql.query("DELETE FROM disponibilidad WHERE id_disponibilidad = ?", [id], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.affectedRows == 0) {
        resolve(null); // No se encontró el registro
        return;
      }
      resolve(res);
    });
  });
};

module.exports = Disponibilidad;
