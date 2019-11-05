/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */

const apiUrl = '';

const getRoomFromDatabase = async () => {
  let result;
  try {
    const response = await fetch(apiUrl);
    const jsonResponse = await response.json();
    result = jsonResponse;
  } catch (e) {
    console.log('error getting: ', e);
  } finally {
    console.log('response: ', result);
  }
};

const postRoomToDatabase = async (roomData) => {
  try {
    await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(roomData),
    });
  } catch (e) {
    console.log('error posting: ', e);
  }
};

module.exports = { getRoomFromDatabase, postRoomToDatabase };
