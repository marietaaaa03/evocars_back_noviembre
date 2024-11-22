const sql = require('./db');

// Constructor de Sucursal
const Sucursal = function(sucursal) {
  this.nombre_sucursal = sucursal.nombre_sucursal;
  this.direccion = sucursal.direccion;
  this.telefono = sucursal.telefono;
  this.cp = sucursal.cp;
  this.codigo_ciudad = sucursal.codigo_ciudad;
};

// Crear una nueva sucursal
Sucursal.create = (newSucursal) => {
  return new Promise((resolve, reject) => {
    sql.query("INSERT INTO sucursales SET ?", newSucursal, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ id_sucursal: res.insertId, ...newSucursal });
    });
  });
};

// Obtener todas las sucursales
Sucursal.getAll = () => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM sucursales", (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
};

// Obtener una sucursal por ID
Sucursal.getById = (id) => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM sucursales WHERE id_sucursal = ?", [id], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.length) {
        resolve(res[0]);
      } else {
        resolve(null); // No se encontró sucursal
      }
    });
  });
};

// Actualizar una sucursal por ID
Sucursal.update = (id, sucursal) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE sucursales SET ? WHERE id_sucursal = ?`;
    sql.query(query, [sucursal, id], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.affectedRows == 0) {
        resolve(null); // Sucursal no encontrada
        return;
      }
      resolve({ id_sucursal: id, ...sucursal });
    });
  });
};

// Eliminar una sucursal por ID
Sucursal.delete = (id) => {
  return new Promise((resolve, reject) => {
    sql.query("DELETE FROM sucursales WHERE id_sucursal = ?", [id], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.affectedRows == 0) {
        resolve(null); // Sucursal no encontrada
        return;
      }
      resolve(res);
    });
  });
};

module.exports = Sucursal;
