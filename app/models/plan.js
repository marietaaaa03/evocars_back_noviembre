const sql = require('./db');

// Constructor de Plan
const Plan = function(plan) {
  this.nombre_plan = plan.nombre_plan;
  this.descripcion = plan.descripcion;
  this.costo_mensual = plan.costo_mensual;
  this.porcentaje_renta = plan.porcentaje_renta;
};

// Crear un nuevo Plan
Plan.create = (newPlan) => {
  return new Promise((resolve, reject) => {
    sql.query("INSERT INTO plan SET ?", newPlan, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ id_plan: res.insertId, ...newPlan });
    });
  });
};

// Obtener todos los planes
Plan.getAll = () => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM plan", (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
};

// Obtener un plan por ID
Plan.getById = (id_plan) => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM plan WHERE id_plan = ?", [id_plan], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.length) {
        resolve(res[0]);
      } else {
        resolve(null); // No se encontró el plan
      }
    });
  });
};

// Actualizar un plan por ID
Plan.update = (id_plan, plan) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE plan SET ? WHERE id_plan = ?`;
    sql.query(query, [plan, id_plan], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.affectedRows == 0) {
        resolve(null); // No se encontró el plan
        return;
      }
      resolve({ id_plan: id_plan, ...plan });
    });
  });
};

// Eliminar un plan por ID
Plan.delete = (id_plan) => {
  return new Promise((resolve, reject) => {
    sql.query("DELETE FROM plan WHERE id_plan = ?", [id_plan], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.affectedRows == 0) {
        resolve(null); // No se encontró el plan
        return;
      }
      resolve(res);
    });
  });
};

module.exports = Plan;
