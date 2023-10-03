const mysql = require('mysql2');

// Create a connection pool
const DBpool = mysql.createPool({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: 'Simple@123', // Replace with your MySQL password
  database: 'test', // Replace with your database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Export the pool to be used in your application
module.exports = DBpool;