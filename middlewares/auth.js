const User = require('../models/User');
const Hoax = require('../models/Hoax');

const { verifyAccessToken } = require('../helpers/token');

const userAuthentication = (req, res, next) => {

  if(req.headers.hasOwnProperty('token')) {
    const decode = verifyAccessToken(req.headers.token);

    User.findById(decode.id)
      .then((user) => {
        if(user) {
          req.authenticated = decode;
          return next();
        } else {
          throw new Error('User not found');
        };
      })
      .catch((error) => {
        if(error.message === 'User not found') {
          res.status(404).json({ message: error.message });
        } else {
          res.status(500).json(error);
        };
      });
  } else {
    res.status(400).json({ message: 'Bad request' });
  };
};

const hoaxOwnership = (req, res, next) => {
  const { id } = req.params;

  Hoax.findById(id)
    .then((hoax) => {
      if(hoax && hoax.userId == req.authenticated.id) {
        next();
      } else {
        throw new Error('Unauthorized');
      };
    })
    .catch((error) => {
      if(error.message == 'Unauthorized') {
        res.status(401).json({ message: error.message });
      } else {
        res.status(500).json(error);
      };
    });
};

module.exports = {
  userAuthentication,
  hoaxOwnership,
};
