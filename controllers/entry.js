const User = require('../models/User');
const email  = require('../helpers/email');

const { createAccessToken } = require('../helpers/token');
const { verifyPassword } = require('../helpers/entry');

const {
  transporter,
  mailOptions,
} = email;

class EntryController {

  static postUserRegister(req, res) {
    const {
      email,
      password,
    } = req.body;

    const newUser = new User({
      email,
      password,
    });

    newUser.save()
      .then((user) => {
        const accessToken = createAccessToken({
          id: user._id,
          email: user.email,
        });

        res.status(201).json({
          token: accessToken,
          currentUser: {
            userId: user._id,
            email: user.email,
          },
        });
      })
      .catch((error) => {
        if(error.errors) {
          res.status(400).json(error.errors);
        } else {
          res.status(500).json(error);
        };
      });
  };

  static postUserLogin(req, res) {
    const {
      email,
      password,
    } = req.body;

    User.findOne({ email })
      .then((user) => {
        if(user && verifyPassword(password, user.password)) {
          const accessToken = createAccessToken({
            id: user._id,
            email: user.email,
          });

          res.status(200).json({
            token: accessToken,
            currentUser: {
              userId: user._id,
              email: user.email,
            },
          });
        } else {
          throw new Error('Wrong email/password');
        };
      })
      .catch((error) => {
        if(error.message === 'Wrong email/password') {
          res.status(400).json({ message: error.message });
        } else {
          res.status(500).json(error);
        };
      });
  };

};

module.exports = EntryController;
