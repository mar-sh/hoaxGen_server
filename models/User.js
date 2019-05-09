const mongoose = require('mongoose');
const { hashPassword } = require('../helpers/entry');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type:String,
    required: [true, 'Email cannot be empty'],
    validate: {
      validator(email) {
        return /.+@.+\..+/ig.test(email);
      },
      message: 'Invalid email format'
    }
  },
  password: {
    type: String,
    required: [true, 'Password cannot be empty']
  }
}, { timestamps: true });

userSchema.pre('save', function(next) {
  this.password = hashPassword(this.password);
  next();
});

userSchema.path('email').validate(function (email) {
  return User.findOne({ email })
    .then((user) => {
      if (user){
        return false;
      } else {
        return true;
      }
    });
}, 'Email is already in use') ;

const User = mongoose.model('User', userSchema);

module.exports= User;