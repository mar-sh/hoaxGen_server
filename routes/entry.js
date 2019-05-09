const express = require('express');

const controller = require('../controllers/entry');

const {
  postUserRegister,
  postUserLogin,
} = controller;

const router = express.Router();

router.post('/register', postUserRegister);
router.post('/login', postUserLogin);

module.exports = router;