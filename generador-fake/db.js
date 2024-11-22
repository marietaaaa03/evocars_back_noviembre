const mysql = require('mysql2/promise');  // Aquí usamos el envoltorio de Promesas

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '8989',
  database: 'evocars',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;