var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
var config = require('../../_config');

var UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    required: true,
    default: false,
  }
});

// hash password before saving it to DB
UserSchema.pre('save', function(next) {
  var user = this;
  // only hash if password is new or being modified
  if (!user.isModified('password')) {
    return next();
  }
  // hash and salt the password
  bcrypt.hash(user.password, config.SALT_WORK_FACTOR, function(err, hash) {
    if (err) return next(err);
    // override the plaintext password with new hashed/salted password
    user.password = hash;
    next();
  });
});

  // compare password to verify plain text against the hashed password
  UserSchema.methods.comparePassword = function(password, done) {
    bcrypt.compare(password, this.password, function(err, match) {
      if (err) return done(err);
      done(err, match);
    });
  };

var User = mongoose.model('users', UserSchema);

module.exports = User;
