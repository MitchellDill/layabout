/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */

const rootUrl = 'http://localhost:3000/';

const getFloorplansFromDatabase = async () => {
  try {
    const response = await fetch(`${rootUrl}users/floorplans`);
    const jsonResponse = await response.json();
    const result = jsonResponse.myFloorplans;
    console.log(result);
    return result;
  } catch (e) {
    console.log('error getting: ', e);
  }
};

const postFloorplanToDatabase = async (floorplanData) => {
  try {
    console.log(floorplanData);
    const response = await fetch(`${rootUrl}users/floorplans`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(floorplanData),
    });
    console.log(response);
    const jsonResponse = response.json();
    console.log(jsonResponse);
  } catch (e) {
    console.log('error posting: ', e);
  }
};

module.exports = { getFloorplansFromDatabase, postFloorplanToDatabase };
