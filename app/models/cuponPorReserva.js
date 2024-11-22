const sql = require('./db');

// Constructor de CuponPorReserva
const CuponPorReserva = function(cuponPorReserva) {
  this.id_cupon = cuponPorReserva.id_cupon;
  this.id_reserva = cuponPorReserva.id_reserva;
};

// Crear un nuevo registro de cupón por reserva
CuponPorReserva.create = (newCuponPorReserva) => {
  return new Promise((resolve, reject) => {
    sql.query("INSERT INTO cupones_por_reserva SET ?", newCuponPorReserva, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ id_cupon: newCuponPorReserva.id_cupon, id_reserva: newCuponPorReserva.id_reserva });
    });
  });
};

// Obtener todos los cupones por reserva
CuponPorReserva.getAll = () => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM cupones_por_reserva", (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
};

// Obtener un registro de cupón por reserva por ID de cupón y reserva
CuponPorReserva.getById = (id_cupon, id_reserva) => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM cupones_por_reserva WHERE id_cupon = ? AND id_reserva = ?", [id_cupon, id_reserva], (err, res) => {
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

// Actualizar un registro de cupón por reserva
CuponPorReserva.update = (id_cupon, id_reserva, cuponPorReserva) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE cupones_por_reserva SET ? WHERE id_cupon = ? AND id_reserva = ?`;
    sql.query(query, [cuponPorReserva, id_cupon, id_reserva], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.affectedRows == 0) {
        resolve(null); // No se encontró el registro
        return;
      }
      resolve({ id_cupon: id_cupon, id_reserva: id_reserva, ...cuponPorReserva });
    });
  });
};

// Eliminar un registro de cupón por reserva
CuponPorReserva.delete = (id_cupon, id_reserva) => {
  return new Promise((resolve, reject) => {
    sql.query("DELETE FROM cupones_por_reserva WHERE id_cupon = ? AND id_reserva = ?", [id_cupon, id_reserva], (err, res) => {
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

module.exports = CuponPorReserva;
