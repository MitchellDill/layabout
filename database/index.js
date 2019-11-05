/* eslint-disable linebreak-style */

const { Pool } = require('pg');
const CONFIG = require('./pg.config.json');

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
    return rows;
  } finally {
    client.release();
  }
};

const insertRoom = async (sessionId, roomCoordinates) => {
  console.log('iterable? ', roomCoordinates);
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
  const query = 'SELECT id FROM rooms WHERE user_id = (SELECT id FROM users WHERE sessionId = $1) AND point1x = $2 AND point1y = $3 AND point2x = $4 AND point2y = $5 AND point3x = $6 AND point3y = $7 AND point4x = $8 AND point4y = $9;';
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
  const query = 'SELECT DISTINCT id FROM furnitureList WHERE name = ($1);';
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
  const mappedFloorPlan = floorplan.furniture.map((piece) => ({
    room: roomPoints, name: piece.type, originX: piece.x, originY: piece.y,
  }));

  for (let i = 0; i < mappedFloorPlan.length; i++) {
    console.log(mappedFloorPlan);
    const piece = mappedFloorPlan[i];
    const query = 'INSERT INTO furniture_rooms (room_id, furniture_id, originX, originY) VALUES ((SELECT id FROM rooms WHERE point1x = $1 AND point1y = $2 AND point2x = $3 AND point2y = $4 AND point3x = $5 AND point3y = $6 AND point4x = $7 AND point4y = $8), (SELECT id FROM furnitureList WHERE name = $9 ), $10, $11);';
    const values = [...piece.room, piece.name, piece.originX, piece.originY];

    const client = await pool.connect();
    try {
      await client.query(query, values);
    } finally {
      client.release();
    }
  }
};


module.exports = {
  createUserSessionRecord, getMyFloorplans, insertRoom, findRoom, insertFurniture, findFurniture, insertFloorPLan,
};
