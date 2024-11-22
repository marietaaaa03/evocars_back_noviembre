const sql = require('./db');

// Constructor de Auto
const Auto = function(auto) {
  this.id_auto = auto.id_auto;
  this.modelo = auto.modelo;
  this.marca = auto.marca;
  this.cilindros = auto.cilindros;
  this.potencia = auto.potencia;
  this.id_color = auto.id_color;
  this.id_categoria = auto.id_categoria;
  this.precio_diario = auto.precio_diario;
  this.id_motor = auto.id_motor;
  this.descripcion = auto.descripcion;
  this.foto_principal = auto.foto_principal;
  this.id_usuario = auto.id_usuario; // Añadimos el id del usuario que creó el auto
};

// trae la info de auto y oferta
Auto.getByUserIdOf = (id_usuario) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        a.id_auto, 
        a.modelo, 
        a.marca, 
        a.precio_diario,
        o.id_oferta, 
        o.descripcion, 
        o.tipo_descuento, 
        o.valor_descuento,
        o.fecha_inicio,
        o.fecha_fin,
        CASE 
          WHEN o.valor_descuento IS NOT NULL THEN 
            CASE 
              WHEN o.tipo_descuento = 'porcentaje' THEN a.precio_diario - (a.precio_diario * (o.valor_descuento / 100))
              ELSE a.precio_diario - o.valor_descuento
            END
          ELSE a.precio_diario
        END AS precio_final
      FROM autos a
      LEFT JOIN ofertas o ON a.id_auto = o.id_auto
      WHERE a.id_usuario = ?
    `;
    
    // Verificar que id_usuario tiene un valor válido
    if (!id_usuario) {
      console.error('Error: id_usuario is undefined or null');
      reject('Invalid id_usuario');
      return;
    }
    
    console.log(`Executing SQL: ${query} with id_usuario: ${id_usuario}`);
    sql.query(query, [id_usuario], (err, res) => {
      if (err) {
        console.error('SQL Error: ', err);
        reject(err);
        return;
      }
      console.log('SQL Result: ', res); // Mostrar el resultado de la consulta
      resolve(res);
    });
  });
};



Auto.getByUserIdDetailed = (id_usuario) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT a.*, u.nombre AS nombre_usuario, c.descripcion AS color, cat.nombre_categoria, 
             m.tipo_motor, o.descripcion AS oferta_descripcion, o.valor_descuento,
             CASE 
               WHEN o.tipo_descuento = 'porcentaje' THEN a.precio_diario * (1 - o.valor_descuento / 100)
               WHEN o.tipo_descuento = 'monto' THEN a.precio_diario - o.valor_descuento
               ELSE a.precio_diario
             END AS precio_con_oferta
      FROM autos a
      LEFT JOIN usuarios u ON a.id_usuario = u.id_usuario
      LEFT JOIN colores c ON a.id_color = c.id_color
      LEFT JOIN categorias cat ON a.id_categoria = cat.id_categoria
      LEFT JOIN motores m ON a.id_motor = m.id_motor
      LEFT JOIN ofertas o ON a.id_auto = o.id_auto AND CURRENT_DATE BETWEEN o.fecha_inicio AND o.fecha_fin
      WHERE a.id_usuario = ?
    `;
    
    sql.query(query, [id_usuario], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
};


// Obtener todos los autos con información detallada
Auto.getAllDetailed = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT a.*, u.nombre AS nombre_usuario, c.descripcion AS color, cat.nombre_categoria, 
             m.tipo_motor, o.descripcion AS oferta_descripcion, o.valor_descuento,
             CASE 
               WHEN o.tipo_descuento = 'porcentaje' THEN a.precio_diario * (1 - o.valor_descuento / 100)
               WHEN o.tipo_descuento = 'monto' THEN a.precio_diario - o.valor_descuento
               ELSE a.precio_diario
             END AS precio_con_oferta
      FROM autos a
      LEFT JOIN usuarios u ON a.id_usuario = u.id_usuario
      LEFT JOIN colores c ON a.id_color = c.id_color
      LEFT JOIN categorias cat ON a.id_categoria = cat.id_categoria
      LEFT JOIN motores m ON a.id_motor = m.id_motor
      LEFT JOIN ofertas o ON a.id_auto = o.id_auto AND CURRENT_DATE BETWEEN o.fecha_inicio AND o.fecha_fin
    `;
    sql.query(query, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
};


// Obtener un auto por ID con información detallada y fotos
Auto.getByIdDetailed = (id) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT a.*, u.nombre AS nombre_usuario, c.descripcion AS color, cat.nombre_categoria, 
             m.tipo_motor, o.descripcion AS oferta_descripcion, o.valor_descuento,
             CASE 
               WHEN o.tipo_descuento = 'porcentaje' THEN a.precio_diario * (1 - o.valor_descuento / 100)
               WHEN o.tipo_descuento = 'monto' THEN a.precio_diario - o.valor_descuento
               ELSE a.precio_diario
             END AS precio_con_oferta
      FROM autos a
      LEFT JOIN usuarios u ON a.id_usuario = u.id_usuario
      LEFT JOIN colores c ON a.id_color = c.id_color
      LEFT JOIN categorias cat ON a.id_categoria = cat.id_categoria
      LEFT JOIN motores m ON a.id_motor = m.id_motor
      LEFT JOIN ofertas o ON a.id_auto = o.id_auto AND CURRENT_DATE BETWEEN o.fecha_inicio AND o.fecha_fin
      WHERE a.id_auto = ?
    `;
    sql.query(query, [id], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.length) {
        // Obtener fotos adicionales
        const fotosQuery = "SELECT url_foto FROM fotos_autos WHERE id_auto = ?";
        sql.query(fotosQuery, [id], (fotoErr, fotoRes) => {
          if (fotoErr) {
            reject(fotoErr);
            return;
          }
          res[0].fotos_adicionales = fotoRes.map(foto => foto.url_foto);
          resolve(res[0]);
        });
      } else {
        resolve(null); // No se encontró auto
      }
    });
  });
};

// Crear un nuevo auto
Auto.create = (newAuto) => {
  return new Promise((resolve, reject) => {
    sql.query("INSERT INTO autos SET ?", newAuto, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ id_auto: res.insertId, ...newAuto });
    });
  });
};

// Obtener todos los autos
Auto.getAll = () => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM autos", (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
};

// Obtener un auto por ID
Auto.getById = (id) => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM autos WHERE id_auto = ?", [id], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.length) {
        resolve(res[0]);
      } else {
        resolve(null); // No se encontró auto
      }
    });
  });
};

// Actualizar un auto por ID
Auto.update = (id, auto) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE autos SET ? WHERE id_auto = ?`;
    sql.query(query, [auto, id], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.affectedRows == 0) {
        resolve(null); // Auto no encontrado
        return;
      }
      resolve({ id_auto: id, ...auto });
    });
  });
};

// Eliminar un auto por ID
Auto.delete = (id) => {
  return new Promise((resolve, reject) => {
    sql.query("DELETE FROM autos WHERE id_auto = ?", [id], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.affectedRows == 0) {
        resolve(null); // Auto no encontrado
        return;
      }
      resolve(res);
    });
  });
};

module.exports = Auto;
