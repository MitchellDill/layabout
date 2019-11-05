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

const createUserSessionRecord = async (sessionId) => {
  const query = 'INSERT INTO users (sessionId) VALUES ($1);';
  const values = [sessionId];

  const client = await pool.connect();
  try {
    const { rows } = await client.query(query, values);
    return rows[0];
  } finally {
    client.release();
  }
};

const getMyFloorPLans = async (sessionId) => {
  const query = 'SELECT * FROM rooms JOIN furniture_rooms ON (rooms.id = furniture_rooms.room_id) WHERE user_id = (SELECT id FROM users WHERE sessionId = $1);';
  const values = [sessionId];

  const client = await pool.connect();
  try {
    const { rows } = await client.query(query, values);
    return rows[0];
  } finally {
    client.release();
  }
};

module.exports = { createUserSessionRecord, getMyFloorPLans };
