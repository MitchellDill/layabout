/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */

const rootUrl = 'http://localhost:3000/';

const getFloorplansFromDatabase = async () => {
  let result;
  try {
    const response = await fetch(`${rootUrl}users/floorplans`);
    const jsonResponse = await response.json();
    result = jsonResponse;
  } catch (e) {
    console.log('error getting: ', e);
  } finally {
    console.log('response: ', result);
  }
};

const postFloorplanToDatabase = async (FloorplanData) => {
  let result;
  try {
    const response = await fetch(`${rootUrl}users/floorplans`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(FloorplanData),
    });
    const jsonResponse = await response.json();
    result = jsonResponse;
  } catch (e) {
    console.log('error posting: ', e);
  } finally {
    console.log('response: ', result);
  }
};

module.exports = { getFloorplansFromDatabase, postFloorplanToDatabase };
