const sql = require('./db');

// Constructor de Cupon
const Cupon = function(cupon) {
  this.id_usuario = cupon.id_usuario;
  this.codigo = cupon.codigo;
  this.descripcion = cupon.descripcion;
  this.tipo_descuento = cupon.tipo_descuento;
  this.valor_descuento = cupon.valor_descuento;
  this.fecha_inicio = cupon.fecha_inicio;
  this.fecha_fin = cupon.fecha_fin;
  this.uso_maximo = cupon.uso_maximo;
  this.uso_actual = cupon.uso_actual || 0;
};
// Obtener cupones por id_usuario
Cupon.getByUserId = (id_usuario) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM cupones WHERE id_usuario = ?`;
    sql.query(query, [id_usuario], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res); // Devuelve todos los cupones del usuario
    });
  });
};

// Crear un nuevo cupón
Cupon.create = (newCupon) => {
  return new Promise((resolve, reject) => {
    sql.query("INSERT INTO cupones SET ?", newCupon, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ id_cupon: res.insertId, ...newCupon });
    });
  });
};

// Obtener todos los cupones
Cupon.getAll = () => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT c.*, u.nombre as usuario FROM cupones c JOIN usuarios u ON c.id_usuario = u.id_usuario", (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
};

// Obtener un cupón por ID
Cupon.getById = (id) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT c.*, u.nombre as usuario
                   FROM cupones c 
                   JOIN usuarios u ON c.id_usuario = u.id_usuario
                   WHERE c.id_cupon = ?`;
    sql.query(query, [id], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.length) {
        resolve(res[0]);
      } else {
        resolve(null); // No se encontró el cupón
      }
    });
  });
};

// Actualizar un cupón por ID
Cupon.update = (id, cupon) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE cupones SET ? WHERE id_cupon = ?`;
    sql.query(query, [cupon, id], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.affectedRows == 0) {
        resolve(null); // Cupón no encontrado
        return;
      }
      resolve({ id_cupon: id, ...cupon });
    });
  });
};

// Eliminar un cupón por ID
Cupon.delete = (id) => {
  return new Promise((resolve, reject) => {
    sql.query("DELETE FROM cupones WHERE id_cupon = ?", [id], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.affectedRows == 0) {
        resolve(null); // Cupón no encontrado
        return;
      }
      resolve(res);
    });
  });
};

module.exports = Cupon;
