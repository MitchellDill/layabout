/* eslint-disable linebreak-style */

const cookieGenerator = () => {
  const sessionId = Math.floor(Math.random() * 500000).toString();
  // await post userId to DB with session ID
  return sessionId;
};

const cookieCheck = (req, res, next) => {
  if (!req.cookies.user_session) {
    res.cookie('user_session', cookieGenerator());
  }
  next();
};


module.exports = { cookieCheck };
