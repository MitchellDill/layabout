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

// app.get('/users', async (req, res) => {
//   const sessionId = req.cookie.user_session;
//   try {
//     roomCoordinates = await getFloorplans(month, year);
//   } catch (e) {
//     console.error(e);
//   } finally {
//     res.send({ roomCoordinates });
//   }
// });

app.route('/users/floorplans')
  .get(async (req, res) => {
    let myFloorPlans;
    const sessionId = req.cookie.user_session;
    try {
      // myFloorPlans = await getMyFloorplans(sessionId);
    } catch (e) {
      console.error(e);
    } finally {
      res.send({ myFloorPlans });
    }
  })
  .post(async (req, res) => {
    const { floorPlan, isNewRoom } = req.body;
    const sessionId = req.cookie.user_session;
    try {
      if (isNewRoom) {
        // await insertRoom(floorplan.roomCoordinates)
        // return roomid
      } else {
        // await findRoom(floorplan.roomCoordinates)
      }
      res.status(201);
    } catch (e) {
      console.error(e);
      res.status(404);
    } finally {
      // await insertFloorPLan(floorPlan, roomId);
      res.send();
    }
  });

app.route('/users/furnitureList')
  .get(async (req, res) => {
    let myFurnitureList;
    const sessionId = req.cookie.user_session;
    try {
    // myFurnitureList = await getMyFurnitureList(sessionId);
    } catch (e) {
      console.error(e);
    } finally {
      res.send({ furnitureList });
    }
  })
  .post(async (req, res) => {
    const { newFurniture } = req.body;
    const sessionId = req.cookie.user_session;
    try {
    // await insertFurniture(newFurniture.name);
    // return furnitureId
    // await associateUserWithFurniture(newFurnitureId, sessionId)
      res.status(201).send('posted! good list.');
    } catch (e) {
      console.error(e);
      res.send(
        'something went wrong saving your creation, dear friend.',
      );
    }
  })
  .delete(async (req, res) => {
    const { deletedFurniture } = req.body;
    const sessionId = req.cookie.user_session;
    try {
    // await disassociateFurniture(deletedFurniture.name, sessionID);
    // return furnitureId
    // await check if anyone still associates with furniture;
    // deleteFurnitureId(furnitureId)
      res.status(203).send('deleted! you are no longer associated with this piece.');
    } catch (e) {
      console.error(e);
      res.send(
        'something went wrong deleted your creation, dear friend.',
      );
    }
  });

app.get('/reports', async (req, res) => {
  let report;
  try {
    // fire report query
  } catch (e) {
    console.error(e);
  } finally {
    // send report
    res.send(report);
  }
});

app.listen(PORT, () => {
  console.log(`Follow me to port ${PORT}`);
});
