const sql = require('./db');

// Constructor de FotoAuto
const FotoAuto = function(foto) {
  this.id_auto = foto.id_auto;
  this.url_foto = foto.url_foto;
};

// Crear una nueva foto para un auto
FotoAuto.create = (newFoto) => {
  return new Promise((resolve, reject) => {
    sql.query("INSERT INTO fotos_autos SET ?", newFoto, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ id_foto: res.insertId, ...newFoto });
    });
  });
};

// Obtener todas las fotos de autos
FotoAuto.getAll = () => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM fotos_autos", (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
};

// Obtener una foto de auto por ID
FotoAuto.getById = (id) => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM fotos_autos WHERE id_foto = ?", [id], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.length) {
        resolve(res[0]);
      } else {
        resolve(null); // No se encontró la foto
      }
    });
  });
};

// Obtener todas las fotos por ID de auto
FotoAuto.getByAutoId = (id_auto) => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM fotos_autos WHERE id_auto = ?", [id_auto], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
};

// Actualizar una foto de auto
FotoAuto.update = (id, foto) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE fotos_autos SET ? WHERE id_foto = ?`;
    sql.query(query, [foto, id], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.affectedRows == 0) {
        resolve(null); // No se encontró la foto
        return;
      }
      resolve({ id_foto: id, ...foto });
    });
  });
};

// Eliminar una foto de auto
FotoAuto.delete = (id) => {
  return new Promise((resolve, reject) => {
    sql.query("DELETE FROM fotos_autos WHERE id_foto = ?", [id], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.affectedRows == 0) {
        resolve(null); // No se encontró la foto
        return;
      }
      resolve(res);
    });
  });
};

module.exports = FotoAuto;
