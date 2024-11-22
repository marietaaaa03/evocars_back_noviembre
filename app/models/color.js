const sql = require('./db');

// Constructor de Color
const Color = function(color) {
  this.descripcion = color.descripcion;
};

// Crear un nuevo color
Color.create = (newColor) => {
  return new Promise((resolve, reject) => {
    sql.query("INSERT INTO colores SET ?", newColor, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ id_color: res.insertId, ...newColor });
    });
  });
};

// Obtener todos los colores
Color.getAll = () => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM colores", (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
};

// Obtener un color por ID
Color.getById = (id) => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM colores WHERE id_color = ?", [id], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.length) {
        resolve(res[0]);
      } else {
        resolve(null); // No se encontró color
      }
    });
  });
};

// Actualizar un color por ID
Color.update = (id, color) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE colores SET ? WHERE id_color = ?`;
    sql.query(query, [color, id], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.affectedRows == 0) {
        resolve(null); // Color no encontrado
        return;
      }
      resolve({ id_color: id, ...color });
    });
  });
};

// Eliminar un color por ID
Color.delete = (id) => {
  return new Promise((resolve, reject) => {
    sql.query("DELETE FROM colores WHERE id_color = ?", [id], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.affectedRows == 0) {
        resolve(null); // Color no encontrado
        return;
      }
      resolve(res);
    });
  });
};

module.exports = Color;
