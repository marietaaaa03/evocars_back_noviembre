const sql = require('./db');

// Constructor de Comision
const Comision = function(comision) {
  this.anio = comision.anio;
  this.porcentaje = comision.porcentaje;
};

// Crear una nueva comisión
Comision.create = (newComision) => {
  return new Promise((resolve, reject) => {
    sql.query("INSERT INTO comision SET ?", newComision, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ id_comision: res.insertId, ...newComision });
    });
  });
};

// Obtener todas las comisiones
Comision.getAll = () => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM comision", (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
};

// Obtener una comisión por ID
Comision.getById = (id) => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM comision WHERE id_comision = ?", [id], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.length) {
        resolve(res[0]);
      } else {
        resolve(null); // No se encontró comisión
      }
    });
  });
};

// Actualizar una comisión por ID
Comision.update = (id, comision) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE comision SET ? WHERE id_comision = ?`;
    sql.query(query, [comision, id], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.affectedRows == 0) {
        resolve(null); // Comisión no encontrada
        return;
      }
      resolve({ id_comision: id, ...comision });
    });
  });
};

// Eliminar una comisión por ID
Comision.delete = (id) => {
  return new Promise((resolve, reject) => {
    sql.query("DELETE FROM comision WHERE id_comision = ?", [id], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.affectedRows == 0) {
        resolve(null); // Comisión no encontrada
        return;
      }
      resolve(res);
    });
  });
};

module.exports = Comision;
