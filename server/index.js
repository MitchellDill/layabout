/* eslint-disable linebreak-style */
const express = require('express');
const cookieParser = require('cookie-parser');
const { cookieCheck } = require('./middleware.js');
const {
  getMyFloorplans, insertRoom, findRoom, insertFurniture, findFurniture, insertFloorPLan,
} = require('../database/index.js');

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cookieCheck);
app.use(express.static('public'));

app.route('/users/floorplans')
  .get(async (req, res) => {
    let myFloorplans;
    const sessionId = req.cookies.user_session;
    try {
      myFloorplans = await getMyFloorplans(sessionId);
    } catch (e) {
      console.error(e);
    } finally {
      res.send({ myFloorplans });
    }
  })
  .post(async (req, res) => {
    console.log(req.body);
    let isNewRoom;
    let hasNewFurniture;
    const floorplan = req.body;
    const sessionId = req.cookies.user_session;
    try {
      // findRoom
      isNewRoom = await findRoom(sessionId, floorplan.roomCoordinates) === undefined;
      // if undefined, isNewRoom
      // findfurniture (loop)
      const newFurniture = [];
      const { furniture } = floorplan;
      for (let i = 0; i < furniture.length; i++) {
        const isNew = await findFurniture(furniture[i].type) === undefined;
        if (isNew && !newFurniture.includes(furniture[i].type)) {
          newFurniture.push(furniture[i].type);
        }
      }
      hasNewFurniture = newFurniture.length > 0;
      // if undefined, hasNewfurniture
      if (isNewRoom) {
        await insertRoom(sessionId, floorplan.roomCoordinates);
      }
      if (hasNewFurniture) {
        for (let i = 0; i < newFurniture.length; i++) {
          await insertFurniture(newFurniture[i]);
        }
      }
      await insertFloorPLan(floorplan);
      res.status(201).send('floorplan created!');
    } catch (e) {
      console.error(e);
      res.status(404).send('something got bungled, chief');
    }
  });

app.route('/users/furnitureList')
  .get(async (req, res) => {
    let myFurnitureList;
    const sessionId = req.cookies.user_session;
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
    const sessionId = req.cookies.user_session;
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
