const sql = require('./db');

// Constructor de CuponPorVendedor
const CuponPorVendedor = function(cuponPorVendedor) {
  this.id_cupon = cuponPorVendedor.id_cupon;
  this.id_usuario = cuponPorVendedor.id_usuario;
};

// Crear un nuevo registro de cupón por vendedor
CuponPorVendedor.create = (newCuponPorVendedor) => {
  return new Promise((resolve, reject) => {
    sql.query("INSERT INTO cupones_por_vendedor SET ?", newCuponPorVendedor, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ id_cupon: newCuponPorVendedor.id_cupon, id_usuario: newCuponPorVendedor.id_usuario });
    });
  });
};

// Obtener todos los cupones por vendedor
CuponPorVendedor.getAll = () => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM cupones_por_vendedor", (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
};

// Obtener un registro de cupón por vendedor por ID de cupón y usuario
CuponPorVendedor.getById = (id_cupon, id_usuario) => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM cupones_por_vendedor WHERE id_cupon = ? AND id_usuario = ?", [id_cupon, id_usuario], (err, res) => {
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

// Actualizar un registro de cupón por vendedor
CuponPorVendedor.update = (id_cupon, id_usuario, cuponPorVendedor) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE cupones_por_vendedor SET ? WHERE id_cupon = ? AND id_usuario = ?`;
    sql.query(query, [cuponPorVendedor, id_cupon, id_usuario], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.affectedRows == 0) {
        resolve(null); // No se encontró el registro
        return;
      }
      resolve({ id_cupon: id_cupon, id_usuario: id_usuario, ...cuponPorVendedor });
    });
  });
};

// Eliminar un registro de cupón por vendedor
CuponPorVendedor.delete = (id_cupon, id_usuario) => {
  return new Promise((resolve, reject) => {
    sql.query("DELETE FROM cupones_por_vendedor WHERE id_cupon = ? AND id_usuario = ?", [id_cupon, id_usuario], (err, res) => {
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

module.exports = CuponPorVendedor;
