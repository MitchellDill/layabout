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

app.get('/users/:userId', async (req, res) => {
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

app.route('/users/floorplans/')
  .get(async (req, res) => {
    let floorPlans;
    // const { month, year } = req.query;
    try {
    // roomCoordinates = await getFloorplans(month, year);
    } catch (e) {
      console.error(e);
    } finally {
      res.send({ roomCoordinates });
    }
  })
  .post(async (req, res) => {
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

app.route('/users/furnitureList')
  .get(async (req, res) => {
    let floorPlans;
    // const { month, year } = req.query;
    try {
    // roomCoordinates = await getFloorplans(month, year);
    } catch (e) {
      console.error(e);
    } finally {
      res.send({ furnitureList });
    }
  })
  .post('/users/furnitureList', async (req, res) => {
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

app.get('/reports', async (req, res) => {
  try {
    // fire report query
  } catch (e) {
    console.error(e);
  } finally {
    // send report
  }
});

app.listen(PORT, () => {
  console.log(`Follow me to port ${PORT}`);
});
