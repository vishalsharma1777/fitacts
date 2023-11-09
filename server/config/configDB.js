require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool( {
  username: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),
  dialect: process.env.DB_DIALECT,
});

module.exports = pool;