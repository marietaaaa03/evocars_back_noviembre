const bcrypt = require('bcryptjs');
const sql = require("./db.js");

const Usuario = function(usuario) {
  this.nombre = usuario.nombre;
  this.email = usuario.email;
  this.contrasena = usuario.contrasena ? usuario.contrasena : bcrypt.hashSync(usuario.contrasena, bcrypt.genSaltSync(10));
  this.fecha_nac = usuario.fecha_nac;
  this.genero = usuario.genero;
  this.id_rol = usuario.id_rol;
  this.foto = usuario.foto;
  this.id_plan = usuario.id_plan;
  this.fecha_decreacion = usuario.fecha_decreacion;
};

Usuario.create = (newUsuario, result) => {
  sql.query("INSERT INTO usuarios SET ?", newUsuario, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, { id_usuario: res.insertId, ...newUsuario });
  });
};

Usuario.findById = (id, result) => {
  sql.query(`SELECT * FROM usuarios WHERE id_usuario = ${id}`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Usuario.getAll = (result) => {
  sql.query("SELECT * FROM usuarios", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Usuario.updateById = (id, usuario, result) => {
  sql.query(
    "UPDATE usuarios SET nombre = ?, email = ?, contrasena = ?, fecha_nac = ?, genero = ?, id_rol = ?, foto = ?, id_plan = ?, fecha_decreacion = ? WHERE id_usuario = ?",
    [usuario.nombre, usuario.email, usuario.contrasena, usuario.fecha_nac, usuario.genero, usuario.id_rol, usuario.foto, usuario.id_plan, usuario.fecha_decreacion, id],
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { id_usuario: id, ...usuario });
    }
  );
};

Usuario.remove = (id, result) => {
  sql.query("DELETE FROM usuarios WHERE id_usuario = ?", id, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    result(null, res);
  });
};

Usuario.removeAll = result => {
  sql.query("DELETE FROM usuarios", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
};

module.exports = Usuario;
