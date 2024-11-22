  const sql = require('./db');

// Constructor de Oferta
const Oferta = function(oferta) {
  this.id_auto = oferta.id_auto;
  this.descripcion = oferta.descripcion;
  this.tipo_descuento = oferta.tipo_descuento;
  this.valor_descuento = oferta.valor_descuento;
  this.fecha_inicio = oferta.fecha_inicio;
  this.fecha_fin = oferta.fecha_fin;
};

// Crear una nueva oferta
Oferta.create = (newOferta) => {
  return new Promise((resolve, reject) => {
    sql.query("INSERT INTO ofertas SET ?", newOferta, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ id_oferta: res.insertId, ...newOferta });
    });
  });
};

// Obtener todas las ofertas con información del auto
Oferta.getAll = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        ofertas.*, 
        autos.modelo, 
        autos.marca, 
        autos.precio_diario 
      FROM ofertas 
      JOIN autos ON ofertas.id_auto = autos.id_auto`;
    
    sql.query(query, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
};

// Obtener una oferta por ID con información del auto
Oferta.getById = (id) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        ofertas.*, 
        autos.modelo, 
        autos.marca, 
        autos.precio_diario 
      FROM ofertas 
      JOIN autos ON ofertas.id_auto = autos.id_auto 
      WHERE id_oferta = ?`;

    sql.query(query, [id], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.length) {
        resolve(res[0]);
      } else {
        resolve(null);
      }
    });
  });
};

// Obtener ofertas por id_auto con información del auto
Oferta.getByIdAuto = (id_auto) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        ofertas.*, 
        autos.modelo, 
        autos.marca, 
        autos.precio_diario 
      FROM ofertas 
      JOIN autos ON ofertas.id_auto = autos.id_auto 
      WHERE ofertas.id_auto = ?`;

    sql.query(query, [id_auto], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
};

// Actualizar una oferta por ID
Oferta.update = (id, oferta) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE ofertas SET ? WHERE id_oferta = ?`;
    sql.query(query, [oferta, id], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.affectedRows == 0) {
        resolve(null); // Oferta no encontrada
        return;
      }
      resolve({ id_oferta: id, ...oferta });
    });
  });
};

// Eliminar una oferta por ID
Oferta.delete = (id) => {
  return new Promise((resolve, reject) => {
    sql.query("DELETE FROM ofertas WHERE id_oferta = ?", [id], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.affectedRows == 0) {
        resolve(null); // Oferta no encontrada
        return;
      }
      resolve(res);
    });
  });
};

module.exports = Oferta;
