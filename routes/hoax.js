const express = require('express');

const controller = require('../controllers/hoax');
const authMiddleware = require('../middlewares/auth');
const imageMiddleware = require('../middlewares/image');

const {
  postCreateHoax,
  getHoaxes,
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

router.use(userAuthentication);

router.post('/', upload.single('file'), sendUploadToGCS, postCreateHoax);
router.get('/', getHoaxes);
router.get('/:id', hoaxOwnership, getHoaxById);
router.delete('/:id', hoaxOwnership, deleteHoaxById);

module.exports = router;