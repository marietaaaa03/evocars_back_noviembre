//dashboardA.model.js
const sql = require('./db');

const DashboardA = function() {};

// Número total de autos
DashboardA.getTotalAutos = () => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT COUNT(*) as total FROM autos", (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res[0]);
    });
  });
};

// Número total de autos por categoría
DashboardA.getAutosPorCategoria = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT c.nombre_categoria, COUNT(a.id_auto) as total
      FROM categorias c
      LEFT JOIN autos a ON c.id_categoria = a.id_categoria
      GROUP BY c.id_categoria, c.nombre_categoria
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

// Autos con ofertas activas
DashboardA.getAutosConOfertas = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT a.*, o.descripcion as oferta_descripcion, 
             o.tipo_descuento, o.valor_descuento
      FROM autos a
      INNER JOIN ofertas o ON a.id_auto = o.id_auto
      WHERE o.fecha_inicio <= CURDATE() 
      AND o.fecha_fin >= CURDATE()
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

// Ingresos por rentas por mes
DashboardA.getIngresosPorMes = (año) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        MONTH(fecha_inicio) as mes,
        SUM(precio_total) as total_ingresos
      FROM rentas
      WHERE YEAR(fecha_inicio) = ?
      GROUP BY MONTH(fecha_inicio)
      ORDER BY mes
    `;
    sql.query(query, [año], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
};

// Comisiones por mes
DashboardA.getComisionesPorMes = (año) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        MONTH(fecha_inicio) as mes,
        SUM(comision) as total_comisiones
      FROM rentas
      WHERE YEAR(fecha_inicio) = ?
      GROUP BY MONTH(fecha_inicio)
      ORDER BY mes
    `;
    sql.query(query, [año], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
};

// Comisiones por año
DashboardA.getComisionesPorAño = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        YEAR(fecha_inicio) as año,
        SUM(comision) as total_comisiones
      FROM rentas
      GROUP BY YEAR(fecha_inicio)
      ORDER BY año
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

// Ingresos por sucursal
DashboardA.getIngresosPorSucursal = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        s.nombre_sucursal,
        SUM(r.precio_total) as total_ingresos
      FROM rentas r
      INNER JOIN sucursales s ON r.id_sucursal = s.id_sucursal
      GROUP BY s.id_sucursal, s.nombre_sucursal
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

// Comisiones por sucursal
DashboardA.getComisionesPorSucursal = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        s.nombre_sucursal,
        SUM(r.comision) as total_comisiones
      FROM rentas r
      INNER JOIN sucursales s ON r.id_sucursal = s.id_sucursal
      GROUP BY s.id_sucursal, s.nombre_sucursal
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

// Usuarios registrados por mes con roles específicos
DashboardA.getUsuariosPorMesYRol = (año) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        MONTH(fecha_decreacion) as mes,
        id_rol,
        COUNT(*) as total_usuarios
      FROM usuarios
      WHERE YEAR(fecha_decreacion) = ?
      AND id_rol IN (1, 2)
      GROUP BY MONTH(fecha_decreacion), id_rol
      ORDER BY mes, id_rol
    `;
    sql.query(query, [año], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
};

// Cupones más usados
DashboardA.getCuponesMasUsados = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        c.id_cupon,
        c.codigo,
        c.descripcion,
        c.tipo_descuento,
        c.valor_descuento,
        c.uso_actual,
        c.uso_maximo,
        COUNT(cpr.id_reserva) as total_uses,
        u.nombre as created_by
      FROM cupones c
      LEFT JOIN cupones_por_reserva cpr ON c.id_cupon = cpr.id_cupon
      LEFT JOIN usuarios u ON c.id_usuario = u.id_usuario
      GROUP BY c.id_cupon
      ORDER BY total_uses DESC
      LIMIT 10
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


module.exports = DashboardA;