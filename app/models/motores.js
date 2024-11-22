const sql = require('./db');

// Constructor de Motor
const Motor = function(motor) {
  this.tipo_motor = motor.tipo_motor;
};

// Crear un nuevo motor
Motor.create = (newMotor) => {
  return new Promise((resolve, reject) => {
    sql.query("INSERT INTO motores SET ?", newMotor, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ id_motor: res.insertId, ...newMotor });
    });
  });
};

// Obtener todos los motores
Motor.getAll = () => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM motores", (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
};

// Obtener un motor por ID
Motor.getById = (id) => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM motores WHERE id_motor = ?", [id], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.length) {
        resolve(res[0]);
      } else {
        resolve(null); // No se encontró el motor
      }
    });
  });
};

// Actualizar un motor
Motor.update = (id, motor) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE motores SET ? WHERE id_motor = ?`;
    sql.query(query, [motor, id], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.affectedRows == 0) {
        resolve(null); // No se encontró el motor
        return;
      }
      resolve({ id_motor: id, ...motor });
    });
  });
};

// Eliminar un motor
Motor.delete = (id) => {
  return new Promise((resolve, reject) => {
    sql.query("DELETE FROM motores WHERE id_motor = ?", [id], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.affectedRows == 0) {
        resolve(null); // No se encontró el motor
        return;
      }
      resolve(res);
    });
  });
};

module.exports = Motor;
