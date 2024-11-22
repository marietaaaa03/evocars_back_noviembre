const sql = require('./db');

// Constructor de PermisosPorRol
const PermisosPorRol = function(permisoPorRol) {
  this.id_rol = permisoPorRol.id_rol;
  this.id_permiso = permisoPorRol.id_permiso;
};

// Crear una nueva asociación entre rol y permiso
PermisosPorRol.create = (newPermisoPorRol) => {
  return new Promise((resolve, reject) => {
    sql.query("INSERT INTO permisos_por_rol SET ?", newPermisoPorRol, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ id_rol: newPermisoPorRol.id_rol, id_permiso: newPermisoPorRol.id_permiso });
    });
  });
};

// Obtener todas las asociaciones rol-permiso
PermisosPorRol.getAll = () => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM permisos_por_rol", (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
};

// Obtener una asociación rol-permiso por ID de rol y permiso
PermisosPorRol.getByIds = (id_rol, id_permiso) => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM permisos_por_rol WHERE id_rol = ? AND id_permiso = ?", [id_rol, id_permiso], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.length) {
        resolve(res[0]);
      } else {
        resolve(null); // No se encontró la asociación
      }
    });
  });
};

// Actualizar una asociación entre rol y permiso
PermisosPorRol.update = (id_rol, id_permiso, permisoPorRol) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE permisos_por_rol SET ? WHERE id_rol = ? AND id_permiso = ?`;
    sql.query(query, [permisoPorRol, id_rol, id_permiso], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.affectedRows == 0) {
        resolve(null); // No se encontró la asociación
        return;
      }
      resolve({ id_rol: id_rol, id_permiso: id_permiso, ...permisoPorRol });
    });
  });
};

// Eliminar una asociación rol-permiso
PermisosPorRol.delete = (id_rol, id_permiso) => {
  return new Promise((resolve, reject) => {
    sql.query("DELETE FROM permisos_por_rol WHERE id_rol = ? AND id_permiso = ?", [id_rol, id_permiso], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.affectedRows == 0) {
        resolve(null); // No se encontró la asociación
        return;
      }
      resolve(res);
    });
  });
};

module.exports = PermisosPorRol;
