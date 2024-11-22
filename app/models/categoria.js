const sql = require('./db');

// Constructor de Categoria
const Categoria = function(categoria) {
  this.nombre_categoria = categoria.nombre_categoria;
};

// Crear una nueva categoría
Categoria.create = (newCategoria) => {
  return new Promise((resolve, reject) => {
    sql.query("INSERT INTO categorias SET ?", newCategoria, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ id_categoria: res.insertId, ...newCategoria });
    });
  });
};

// Obtener todas las categorías
Categoria.getAll = () => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM categorias", (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
};

// Obtener una categoría por ID
Categoria.getById = (id) => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM categorias WHERE id_categoria = ?", [id], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.length) {
        resolve(res[0]);
      } else {
        resolve(null); // No se encontró la categoría
      }
    });
  });
};

// Actualizar una categoría por ID
Categoria.update = (id, categoria) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE categorias SET ? WHERE id_categoria = ?`;
    sql.query(query, [categoria, id], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.affectedRows == 0) {
        resolve(null); // Categoría no encontrada
        return;
      }
      resolve({ id_categoria: id, ...categoria });
    });
  });
};

// Eliminar una categoría por ID
Categoria.delete = (id) => {
  return new Promise((resolve, reject) => {
    sql.query("DELETE FROM categorias WHERE id_categoria = ?", [id], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.affectedRows == 0) {
        resolve(null); // Categoría no encontrada
        return;
      }
      resolve(res);
    });
  });
};

module.exports = Categoria;
