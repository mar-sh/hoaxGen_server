const express = require('express');

const controller = require('../controllers/hoax');
const authMiddleware = require('../middlewares/auth');
const imageMiddleware = require('../middlewares/image');

const {
  postCreateHoax,
  getHoaxesByUser,
  getHoaxById,
  deleteHoaxById,
} = controller;

const {
  userAuthentication,
  hoaxOwnership,
} = authMiddleware;

const {
  upload,
  sendUploadToGCS,
} = imageMiddleware;

const router = express.Router();

router.post('/', userAuthentication, upload.single('file'), sendUploadToGCS, postCreateHoax);
router.get('/', getHoaxesByUser);
router.get('/:id', getHoaxById);
router.delete('/:id', deleteHoaxById);

module.exports = router;