var bcrypt = require('bcrypt'),
    mongoose = require('mongoose'),
    SALT_WORK_FACTOR = 10,
    userSchema = mongoose.Schema({
      firstname: { type: String, required: true },
      lastname: { type: String, required: true },
      username: { type: String, required: true, unique: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true }
    });

userSchema.virtual('fullname').get(function () {
  return this.firstname + ' ' + this.lastname;
});

// bcrypt middleware
userSchema.pre('save', function(next) {
  var user = this;

  if(!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if(err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if(err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// Logging middle to database write
userSchema.post('save', function (doc) {
})

// password verification
userSchema.methods.comparePassword = function(candidatePassword,callback){
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if(err) return callback(err);
    callback(null, isMatch);
  });
};

var User = mongoose.model('User', userSchema);
module.exports = User;
