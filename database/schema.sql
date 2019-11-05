CREATE TABLE users (
    id serial PRIMARY KEY,
    sessionId VARCHAR(255)
);

CREATE TABLE furnitureList (
    id serial PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE users_furnitureList (
    id serial PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    furniture_id INTEGER REFERENCES furnitureList(id)
);

CREATE TABLE rooms (
    id serial PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    point1x INTEGER NOT NULL,
    point1y INTEGER NOT NULL,
    point2x INTEGER NOT NULL,
    point2y INTEGER NOT NULL,
    point3x INTEGER NOT NULL,
    point3y INTEGER NOT NULL,
    point4x INTEGER,
    point4y INTEGER,
    point5x INTEGER,
    point5y INTEGER,
    point6x INTEGER,
    point6y INTEGER,
    point7x INTEGER,
    point7y INTEGER,
    point8x INTEGER,
    point8y INTEGER
);

CREATE TABLE furniture_rooms (
    id serial PRIMARY KEY,
    room_id INTEGER REFERENCES rooms(id),
    furniture_id INTEGER REFERENCES furnitureList(id),
    originX INTEGER,
    originY INTEGER
);