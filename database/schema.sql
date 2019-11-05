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
    point1 INTEGER NOT NULL,
    point2 INTEGER NOT NULL,
    point3 INTEGER NOT NULL,
    point4 INTEGER,
    point5 INTEGER,
    point6 INTEGER,
    point7 INTEGER,
    point8 INTEGER,
    point9 INTEGER,
    point10 INTEGER,
    point11 INTEGER,
    point12 INTEGER
);

CREATE TABLE furniture_rooms (
    id serial PRIMARY KEY,
    room_id INTEGER REFERENCES rooms(id),
    furniture_id INTEGER REFERENCES furnitureList(id),
    originX INTEGER,
    originY INTEGER
);