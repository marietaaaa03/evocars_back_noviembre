const sql = require('./db');

// Constructor de Renta
const Renta = function(renta) {
  this.id_usuario = renta.id_usuario;
  this.id_auto = renta.id_auto;
  this.stripe_payment_id = renta.stripe_payment_id;
  this.fecha_reserva = renta.fecha_reserva;
  this.fecha_inicio = renta.fecha_inicio;
  this.fecha_fin = renta.fecha_fin;
  this.estado = renta.estado;
  this.id_sucursal = renta.id_sucursal;
  this.precio_total = renta.precio_total;
  this.id_comision = renta.id_comision;
  this.comision = renta.comision;
};

// Crear una nueva Renta
Renta.create = (newRenta) => {
  return new Promise((resolve, reject) => {
    sql.query("INSERT INTO rentas SET ?", newRenta, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ id_reserva: res.insertId, ...newRenta });
    });
  });
};

// Obtener todas las Rentas
Renta.getAll = () => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM rentas", (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
};

// Obtener una Renta por ID
Renta.getById = (id_reserva) => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM rentas WHERE id_reserva = ?", [id_reserva], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.length) {
        resolve(res[0]);
      } else {
        resolve(null); // No se encontró la renta
      }
    });
  });
};

// Actualizar una Renta por ID
Renta.update = (id_reserva, renta) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE rentas SET ? WHERE id_reserva = ?`;
    sql.query(query, [renta, id_reserva], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.affectedRows == 0) {
        resolve(null); // No se encontró la renta
        return;
      }
      resolve({ id_reserva: id_reserva, ...renta });
    });
  });
};

// Eliminar una Renta por ID
Renta.delete = (id_reserva) => {
  return new Promise((resolve, reject) => {
    sql.query("DELETE FROM rentas WHERE id_reserva = ?", [id_reserva], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.affectedRows == 0) {
        resolve(null); // No se encontró la renta
        return;
      }
      resolve(res);
    });
  });
};

module.exports = Renta;
