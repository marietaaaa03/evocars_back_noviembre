const sql = require('./db');

// Constructor de Permiso
const Permiso = function(permiso) {
  this.nombre_permiso = permiso.nombre_permiso;
  this.clave = permiso.clave;
};

// Crear un nuevo permiso
Permiso.create = (newPermiso) => {
  return new Promise((resolve, reject) => {
    sql.query("INSERT INTO permisos SET ?", newPermiso, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ id_permiso: res.insertId, ...newPermiso });
    });
  });
};

// Obtener todos los permisos
Permiso.getAll = () => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM permisos", (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
};

// Obtener un permiso por ID
Permiso.getById = (id) => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM permisos WHERE id_permiso = ?", [id], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.length) {
        resolve(res[0]);
      } else {
        resolve(null); // No se encontró el permiso
      }
    });
  });
};

// Actualizar un permiso
Permiso.update = (id, permiso) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE permisos SET ? WHERE id_permiso = ?`;
    sql.query(query, [permiso, id], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.affectedRows == 0) {
        resolve(null); // No se encontró el permiso
        return;
      }
      resolve({ id_permiso: id, ...permiso });
    });
  });
};

// Eliminar un permiso
Permiso.delete = (id) => {
  return new Promise((resolve, reject) => {
    sql.query("DELETE FROM permisos WHERE id_permiso = ?", [id], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.affectedRows == 0) {
        resolve(null); // No se encontró el permiso
        return;
      }
      resolve(res);
    });
  });
};

module.exports = Permiso;
