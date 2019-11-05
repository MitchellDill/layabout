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

const getMyFloorplans = async (sessionId) => {
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

const insertRoom = async (sessionId, roomCoordinates) => {
  const query = 'INSERT INTO rooms (user_id, point1x, point1y, point2x, point2y, point3x, point3y, point4x, point4y) VALUES ((SELECT id FROM users WHERE sessionId = $1), $2, $3, $4, $5, $6, $7, $8, $9);';
  const values = [sessionId, ...roomCoordinates];

  const client = await pool.connect();
  try {
    const { rows } = await client.query(query, values);
    return rows[0];
  } finally {
    client.release();
  }
};


const findRoom = async (sessionId, roomCoordinates) => {
  const query = 'SELECT id FROM rooms WHERE user_id = (SELECT id FROM users WHERE sessionId = $1) AND WHERE point1x = $2 AND point1y = $3 AND point2x = $4 AND point2y = $5 AND point3x = $6 AND point3y = $7 AND point4x = $8 AND point4y = $9;';
  const values = [sessionId, ...roomCoordinates];

  const client = await pool.connect();
  try {
    const { rows } = await client.query(query, values);
    return rows[0];
  } finally {
    client.release();
  }
};


const insertFurniture = async (furnitureType) => {
  const query = 'INSERT INTO furnitureList (name) VALUES ($1);';
  const values = [furnitureType];

  const client = await pool.connect();
  try {
    const { rows } = await client.query(query, values);
    return rows[0];
  } finally {
    client.release();
  }
};

const findFurniture = async (furnitureType) => {
  const query = 'SELECT id FROM furnitureList WHERE name = ($1);';
  const values = [furnitureType];

  const client = await pool.connect();
  try {
    const { rows } = await client.query(query, values);
    return rows[0];
  } finally {
    client.release();
  }
};

const insertFloorPLan = async (floorplan) => {
  const roomPoints = [...floorplan.roomCoordinates];
  const mappedFloorPlan = floorplan.furniture((piece) => ({
    room: roomPoints, name: piece.type, originX: piece.x, originY: piece.y,
  }));

  for (let i = 0; i < mappedFloorPlan.length; i++) {
    const piece = mappedFloorPlan[i];
    const query = `INSERT INTO furniture_rooms (room_id, furniture_id, originX, originY) VALUES ((SELECT id WHERE point1x = $${i} AND point1y = $${i + 1} AND point2x = $${i + 2} AND point2y = $${i + 3} AND point3x = $${i + 4} AND point3y = $${i + 5} AND point4x = $${i + 6} AND point4y = $${i + 7}), (SELECT id FROM furnitureList WHERE name = $${i + 8} ), $${i + 9}, $${i + 10}});`;
    const values = [...piece.room, piece.name, piece.originX, piece.originY];

    const client = await pool.connect();
    try {
      const { rows } = await client.query(query, values);
      return rows[0];
    } finally {
      client.release();
    }
  }
};


module.exports = {
  createUserSessionRecord, getMyFloorplans, insertRoom, findRoom, insertFurniture, findFurniture, insertFloorPLan,
};
