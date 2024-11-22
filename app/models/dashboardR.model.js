const sql = require('./db');

const DashboardR = {
    getRentasTotales(id_usuario) {
        return new Promise((resolve, reject) => {
            sql.query(
                `SELECT COUNT(*) as total 
                FROM rentas 
                WHERE id_usuario = ?`, 
                [id_usuario],
                (err, res) => {
                    if (err) reject(err);
                    resolve(res[0]);
                }
            );
        });
    },

    getIngresosTotales(id_usuario) {
        return new Promise((resolve, reject) => {
            sql.query(
                `SELECT SUM(precio_total) as total 
                FROM rentas 
                WHERE id_usuario = ?`,
                [id_usuario],
                (err, res) => {
                    if (err) reject(err);
                    resolve(res[0]);
                }
            );
        });
    },

    getRentasPorMes(id_usuario, año) {
        return new Promise((resolve, reject) => {
            sql.query(
                `SELECT 
                    CASE MONTH(fecha_inicio)
                        WHEN 1 THEN 'Ene'
                        WHEN 2 THEN 'Feb'
                        WHEN 3 THEN 'Mar'
                        WHEN 4 THEN 'Abr'
                        WHEN 5 THEN 'May'
                        WHEN 6 THEN 'Jun'
                        WHEN 7 THEN 'Jul'
                        WHEN 8 THEN 'Ago'
                        WHEN 9 THEN 'Sep'
                        WHEN 10 THEN 'Oct'
                        WHEN 11 THEN 'Nov'
                        WHEN 12 THEN 'Dic'
                    END as mes,
                    COUNT(*) as total_rentas
                FROM rentas
                WHERE id_usuario = ? 
                AND YEAR(fecha_inicio) = ?
                GROUP BY MONTH(fecha_inicio)
                ORDER BY MONTH(fecha_inicio)`,
                [id_usuario, año],
                (err, res) => {
                    if (err) reject(err);
                    resolve(res);
                }
            );
        });
    },

    getIngresosPorMes(id_usuario, año) {
        return new Promise((resolve, reject) => {
            sql.query(
                `SELECT 
                    CASE MONTH(fecha_inicio)
                        WHEN 1 THEN 'Ene'
                        WHEN 2 THEN 'Feb'
                        WHEN 3 THEN 'Mar'
                        WHEN 4 THEN 'Abr'
                        WHEN 5 THEN 'May'
                        WHEN 6 THEN 'Jun'
                        WHEN 7 THEN 'Jul'
                        WHEN 8 THEN 'Ago'
                        WHEN 9 THEN 'Sep'
                        WHEN 10 THEN 'Oct'
                        WHEN 11 THEN 'Nov'
                        WHEN 12 THEN 'Dic'
                    END as mes,
                    SUM(precio_total) as ingresos_totales
                FROM rentas
                WHERE id_usuario = ? 
                AND YEAR(fecha_inicio) = ?
                GROUP BY MONTH(fecha_inicio)
                ORDER BY MONTH(fecha_inicio)`,
                [id_usuario, año],
                (err, res) => {
                    if (err) reject(err);
                    resolve(res);
                }
            );
        });
    },

    getRentasPorCategoria(id_usuario) {
        return new Promise((resolve, reject) => {
            sql.query(
                `SELECT 
                    c.nombre_categoria,
                    COUNT(*) as total_rentas
                FROM rentas r
                JOIN autos a ON r.id_auto = a.id_auto
                JOIN categorias c ON a.id_categoria = c.id_categoria
                WHERE r.id_usuario = ?
                GROUP BY c.nombre_categoria`,
                [id_usuario],
                (err, res) => {
                    if (err) reject(err);
                    resolve(res);
                }
            );
        });
    },

    getGananciasYComisiones(id_usuario) {
        return new Promise((resolve, reject) => {
            sql.query(
                `SELECT 
                    SUM(precio_total) as ingresos_brutos,
                    SUM(comision) as comisiones,
                    SUM(precio_total - comision) as ganancias_netas
                FROM rentas
                WHERE id_usuario = ?`,
                [id_usuario],
                (err, res) => {
                    if (err) reject(err);
                    resolve(res[0]);
                }
            );
        });
    },

    getRendimientoPorSucursal(id_usuario) {
        return new Promise((resolve, reject) => {
            sql.query(
                `SELECT 
                    s.nombre_sucursal,
                    COUNT(r.id_reserva) as total_rentas,
                    SUM(r.precio_total) as ingresos_totales,
                    COUNT(DISTINCT a.id_auto) as total_autos
                FROM rentas r
                JOIN sucursales s ON r.id_sucursal = s.id_sucursal
                JOIN autos a ON r.id_auto = a.id_auto
                WHERE r.id_usuario = ?
                GROUP BY s.id_sucursal, s.nombre_sucursal`,
                [id_usuario],
                (err, res) => {
                    if (err) reject(err);
                    resolve(res);
                }
            );
        });
    },

    getTopAutosRentados(id_usuario, limite = 5) {
        return new Promise((resolve, reject) => {
            sql.query(
                `SELECT 
                    CONCAT(a.marca, ' ', a.modelo) as auto,
                    COUNT(*) as total_rentas,
                    SUM(r.precio_total) as ingresos_totales,
                    AVG(r.precio_total) as promedio_renta
                FROM rentas r
                JOIN autos a ON r.id_auto = a.id_auto
                WHERE r.id_usuario = ?
                GROUP BY a.id_auto, a.marca, a.modelo
                ORDER BY total_rentas DESC
                LIMIT ?`,
                [id_usuario, limite],
                (err, res) => {
                    if (err) reject(err);
                    resolve(res);
                }
            );
        });
    },

    getDuracionRentas(id_usuario) {
        return new Promise((resolve, reject) => {
            sql.query(
                `SELECT 
                    CASE 
                        WHEN DATEDIFF(fecha_fin, fecha_inicio) <= 3 THEN 'Corta (1-3 días)'
                        WHEN DATEDIFF(fecha_fin, fecha_inicio) <= 7 THEN 'Media (4-7 días)'
                        WHEN DATEDIFF(fecha_fin, fecha_inicio) <= 14 THEN 'Larga (8-14 días)'
                        ELSE 'Extendida (15+ días)'
                    END as duracion,
                    COUNT(*) as total_rentas,
                    AVG(precio_total) as promedio_ingreso
                FROM rentas
                WHERE id_usuario = ?
                GROUP BY duracion
                ORDER BY 
                    CASE duracion
                        WHEN 'Corta (1-3 días)' THEN 1
                        WHEN 'Media (4-7 días)' THEN 2
                        WHEN 'Larga (8-14 días)' THEN 3
                        ELSE 4
                    END`,
                [id_usuario],
                (err, res) => {
                    if (err) reject(err);
                    resolve(res);
                }
            );
        });
    },

    getEstadisticasCancelaciones(id_usuario) {
        return new Promise((resolve, reject) => {
            sql.query(
                `SELECT 
                    DATE_FORMAT(fecha_inicio, '%Y-%m') as mes,
                    COUNT(*) as total_reservas,
                    SUM(CASE WHEN estado = 'cancelada' THEN 1 ELSE 0 END) as cancelaciones,
                    ROUND((SUM(CASE WHEN estado = 'cancelada' THEN 1 ELSE 0 END) / COUNT(*)) * 100, 2) as tasa_cancelacion
                FROM rentas
                WHERE id_usuario = ?
                GROUP BY DATE_FORMAT(fecha_inicio, '%Y-%m')
                ORDER BY mes DESC
                LIMIT 12`,
                [id_usuario],
                (err, res) => {
                    if (err) reject(err);
                    resolve(res);
                }
            );
        });
    },

    getPromedios(id_usuario) {
        return new Promise((resolve, reject) => {
            sql.query(
                `SELECT 
                    AVG(DATEDIFF(fecha_fin, fecha_inicio)) as duracion_promedio,
                    SUM(precio_total) / COUNT(DISTINCT id_auto) as ingreso_por_auto,
                    (COUNT(*) * 100.0 / (
                        SELECT COUNT(DISTINCT id_auto) FROM autos 
                        WHERE id_usuario = ?
                    )) as tasa_ocupacion
                FROM rentas
                WHERE id_usuario = ?`,
                [id_usuario, id_usuario],
                (err, res) => {
                    if (err) reject(err);
                    resolve(res[0]);
                }
            );
        });
    },

    // Nuevas funciones para análisis de cupones
    getTopCupones(id_usuario, limite = 5) {
        return new Promise((resolve, reject) => {
            sql.query(
                `SELECT 
                    c.codigo,
                    c.descripcion,
                    c.tipo_descuento,
                    c.valor_descuento,
                    COUNT(cpr.id_reserva) as total_usos,
                    SUM(r.precio_total) as valor_total_transacciones,
                    ROUND(AVG(r.precio_total), 2) as valor_promedio_transaccion,
                    c.uso_actual,
                    c.uso_maximo,
                    ROUND((c.uso_actual / c.uso_maximo) * 100, 2) as porcentaje_uso
                FROM cupones c
                LEFT JOIN cupones_por_reserva cpr ON c.id_cupon = cpr.id_cupon
                LEFT JOIN rentas r ON cpr.id_reserva = r.id_reserva
                WHERE c.id_usuario = ? 
                GROUP BY c.id_cupon, c.codigo, c.descripcion, c.tipo_descuento, 
                         c.valor_descuento, c.uso_actual, c.uso_maximo
                ORDER BY total_usos DESC
                LIMIT ?`,
                [id_usuario, limite],
                (err, res) => {
                    if (err) reject(err);
                    resolve(res);
                }
            );
        });
    },

    getCuponesStats(id_usuario) {
        return new Promise((resolve, reject) => {
            sql.query(
                `SELECT 
                    COUNT(DISTINCT c.id_cupon) as total_cupones,
                    SUM(c.uso_actual) as total_usos,
                    ROUND(AVG(c.uso_actual), 2) as promedio_usos,
                    COUNT(DISTINCT CASE WHEN c.uso_actual = c.uso_maximo THEN c.id_cupon END) as cupones_agotados,
                    COUNT(DISTINCT CASE WHEN CURRENT_DATE > c.fecha_fin THEN c.id_cupon END) as cupones_expirados,
                    COUNT(DISTINCT CASE 
                        WHEN c.uso_actual < c.uso_maximo 
                        AND CURRENT_DATE BETWEEN c.fecha_inicio AND c.fecha_fin 
                        THEN c.id_cupon 
                    END) as cupones_activos
                FROM cupones c
                WHERE c.id_usuario = ?`,
                [id_usuario],
                (err, res) => {
                    if (err) reject(err);
                    resolve(res[0]);
                }
            );
        });
    },

    getCuponesPorMes(id_usuario, año) {
        return new Promise((resolve, reject) => {
            sql.query(
                `SELECT 
                    CASE MONTH(r.fecha_reserva)
                        WHEN 1 THEN 'Ene'
                        WHEN 2 THEN 'Feb'
                        WHEN 3 THEN 'Mar'
                        WHEN 4 THEN 'Abr'
                        WHEN 5 THEN 'May'
                        WHEN 6 THEN 'Jun'
                        WHEN 7 THEN 'Jul'
                        WHEN 8 THEN 'Ago'
                        WHEN 9 THEN 'Sep'
                        WHEN 10 THEN 'Oct'
                        WHEN 11 THEN 'Nov'
                        WHEN 12 THEN 'Dic'
                    END as mes,
                    COUNT(DISTINCT cpr.id_cupon) as cupones_utilizados,
                    COUNT(cpr.id_reserva) as total_usos,
                    ROUND(AVG(r.precio_total), 2) as valor_promedio_reserva
                FROM cupones c
                JOIN cupones_por_reserva cpr ON c.id_cupon = cpr.id_cupon
                JOIN rentas r ON cpr.id_reserva = r.id_reserva
                WHERE c.id_usuario = ?
                AND YEAR(r.fecha_reserva) = ?
                GROUP BY MONTH(r.fecha_reserva)
                ORDER BY MONTH(r.fecha_reserva)`,
                [id_usuario, año],
                (err, res) => {
                    if (err) reject(err);
                    resolve(res);
                }
            );
        });
    }

};

module.exports = DashboardR;