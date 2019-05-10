const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hoaxSchema = new Schema({
  url: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  isTemplate: {
    type: String,
    default: 'false',
  },
}, { timestamps: true });

const Hoax = mongoose.model('Hoax', hoaxSchema);

module.exports = Hoax;
