/* eslint-disable linebreak-style */

const { Pool } = require('pg');
const CONFIG = require('./pg.config.example.json');

const pool = new Pool({
  host: CONFIG.host,
  user: CONFIG.user,
  database: CONFIG.database,
  password: CONFIG.password,
  port: CONFIG.port,
  max: 50,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const databaseStuff = async (name) => {
//   const query = 'SELECT ProductId FROM items WHERE name = $1;';
//   const values = [name];

  const client = await pool.connect();
  try {
    const { rows } = await client.query(query, values);
    return rows[0];
  } finally {
    client.release();
  }
};

module.exports = { databaseStuff };
