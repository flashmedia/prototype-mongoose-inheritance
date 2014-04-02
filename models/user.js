var mongoose = require('mongoose'),
    util = require('util');

function BaseSchema() {
  mongoose.Schema.apply(this, arguments);

  this.add({
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }
  });
}
util.inherits(BaseSchema, mongoose.Schema);

var UserSchema = new BaseSchema();
var ManagerSchema = new BaseSchema({ department: String });

var Person = mongoose.model('User', UserSchema);
var Boss = Person.discriminator('Manager', ManagerSchema);
