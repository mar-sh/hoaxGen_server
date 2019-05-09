const express = require('express');

const entryRoute = require('./entry');
const hoaxRoute = require('./hoax');

const router = express.Router();

router.use('/', entryRoute);
router.use('/hoaxes', hoaxRoute);

module.exports = router;

