/* eslint-disable linebreak-style */
const { createUserSessionRecord } = require('../database/index.js');

const cookieGenerator = async () => {
  const sessionId = Math.floor(Math.random() * 500000).toString();
  await createUserSessionRecord(sessionId);
  return sessionId;
};

const cookieCheck = async (req, res, next) => {
  if (!req.cookies.user_session) {
    const generatedCookie = await cookieGenerator();
    res.cookie('user_session', generatedCookie);
  }
  next();
};


module.exports = { cookieCheck };
