/* eslint-disable linebreak-style */
const express = require('express');
const cookieParser = require('cookie-parser');
const { cookieCheck } = require('./middleware.js');

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cookieCheck);
app.use(express.static('public'));

app.get('/api/users', async (req, res) => {
  let user;
  // const { month, year } = req.query;
  try {
    // roomCoordinates = await getFloorplans(month, year);
  } catch (e) {
    console.error(e);
  } finally {
    res.send({ roomCoordinates });
  }
});


app.post('/api/users', async (req, res) => {
  const user = req.body;
  try {
    // await insertFloorPLan(month);
    res.status(201).send('posted! good user.');
  } catch (e) {
    console.error(e);
    res.send(
      'something went wrong! do you still exist?',
    );
  }
});

app.get('/api/floorplans', async (req, res) => {
  let floorPlans;
  // const { month, year } = req.query;
  try {
    // roomCoordinates = await getFloorplans(month, year);
  } catch (e) {
    console.error(e);
  } finally {
    res.send({ roomCoordinates });
  }
});

app.post('/api/floorplans', async (req, res) => {
  const floorPlan = req.body;
  try {
    // await insertFloorPLan(month);
    res.status(201).send('posted! good plan.');
  } catch (e) {
    console.error(e);
    res.send(
      'something went wrong! do you still have a floor?',
    );
  }
});

app.get('/api/furnitureLists', async (req, res) => {
  let floorPlans;
  // const { month, year } = req.query;
  try {
    // roomCoordinates = await getFloorplans(month, year);
  } catch (e) {
    console.error(e);
  } finally {
    res.send({ furnitureList });
  }
});

app.post('/api/furnitureLists', async (req, res) => {
  const furnitureList = req.body;
  try {
    // await insertFloorPLan(month);
    res.status(201).send('posted! good list.');
  } catch (e) {
    console.error(e);
    res.send(
      'something went wrong saving your creation, dear friend.',
    );
  }
});


app.get('/', async (req, res) => {
  // try {
  //   if (!req.cookies.user_session) {
  //     sessionId = Math.floor(Math.random() * 500000).toString();
  //     // await post userId to DB with session ID
  //     res.cookie('user_session', sessionId);
  //   }
  // } catch (e) {
  //   console.error(e);
  // } finally {
  //   res.status(200).send('cookie created!');
  // }
});


app.listen(PORT, () => {
  console.log(`Follow me to port ${PORT}`);
});
