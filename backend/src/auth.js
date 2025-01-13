// inspired by the book authen example
const jwt = require('jsonwebtoken');
const db = require('./db');
const secrets = require('../data/secrets');

exports.login = async (req, res) => {
  const {email, password} = req.body;
  const user = await db.getUser(email, password);
  if (user) {
    const accessToken = jwt.sign(
      {email: user.email, role: user.role},
      secrets.accessToken, {
        expiresIn: '30m',
        algorithm: 'HS256',
      });
    res.status(200).json(
      {
        name: user.username,
        accessToken: accessToken,
        id: user.id,
      });
  } else {
    res.status(401).send('Invalid Credentials');
  }
};
