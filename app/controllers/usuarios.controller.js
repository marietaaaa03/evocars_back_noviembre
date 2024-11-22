const Usuario = require('../models/usuario.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Crear y guardar un nuevo usuario
exports.create = (req, res) => {
  if (!req.body.nombre || !req.body.email || !req.body.contrasena || !req.body.fecha_nac || !req.body.genero || !req.body.id_rol || !req.body.foto) {
    res.status(400).send({ message: "¡El contenido no puede estar vacío!" });
    return;
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.contrasena, salt);

  // Crear un usuario
  const usuario = new Usuario({
    nombre: req.body.nombre,
    email: req.body.email,
    contrasena: hashedPassword,
    fecha_nac: req.body.fecha_nac,
    genero: req.body.genero,
    id_rol: req.body.id_rol,
    foto: req.body.foto,
    id_plan: req.body.id_plan || null, // Campo opcional
    fecha_decreacion: new Date() // Agregar la fecha de creación actual
  });

  Usuario.create(usuario, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "¡Se produjo un error al crear el usuario!"
      });
    } else {
      const token = jwt.sign({ id: data.id_usuario }, 'your-secret-key', {
        expiresIn: 86400 // expires in 24 hours
      });

      const userInfo = {
        id_usuario: data.id_usuario,
        nombre: data.nombre,
        email: data.email,
        fecha_nac: data.fecha_nac,
        genero: data.genero,
        id_rol: data.id_rol,
        foto: data.foto,
        id_plan: data.id_plan,
        fecha_decreacion: data.fecha_decreacion
      };

      res.send({ token, userInfo });
    }
  });
};

// Obtener todos los usuarios
exports.findAll = (req, res) => {
  Usuario.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "¡Se produjo un error al recuperar los usuarios!"
      });
    } else {
      res.send(data);
    }
  });
};

// Obtener un usuario por su id
exports.findOne = (req, res) => {
  Usuario.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `¡Usuario no encontrado con id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "¡Error al recuperar el usuario con id " + req.params.id
        });
      }
    } else {
      res.send(data);
    }
  });
};

// Actualizar un usuario por su id
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "¡El contenido no puede estar vacío!"
    });
    return;
  }

  const updatedUserData = new Usuario(req.body);

  if (req.body.contrasena) {
    const salt = bcrypt.genSaltSync(10);
    updatedUserData.contrasena = bcrypt.hashSync(req.body.contrasena, salt);
  }

  Usuario.updateById(
    req.params.id,
    updatedUserData,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `¡Usuario no encontrado con id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "¡Error al actualizar el usuario con id " + req.params.id
          });
        }
      } else {
        const userInfo = {
          id_usuario: req.params.id,
          nombre: updatedUserData.nombre,
          email: updatedUserData.email,
          fecha_nac: updatedUserData.fecha_nac,
          genero: updatedUserData.genero,
          id_rol: updatedUserData.id_rol,
          foto: updatedUserData.foto,
          id_plan: updatedUserData.id_plan,
          fecha_decreacion: updatedUserData.fecha_decreacion
        };

        res.send(userInfo);
      }
    }
  );
};

// Borrar un usuario por su id
exports.delete = (req, res) => {
  Usuario.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `¡Usuario no encontrado con id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "¡No se pudo eliminar el usuario con id " + req.params.id
        });
      }
    } else {
      res.send({ message: "¡Usuario eliminado correctamente!" });
    }
  });
};

// Borrar todos los usuarios
exports.deleteAll = (req, res) => {
  Usuario.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "¡Se produjo un error al eliminar todos los usuarios!"
      });
    } else {
      res.send({ message: "¡Todos los usuarios fueron eliminados correctamente!" });
    }
  });
};
