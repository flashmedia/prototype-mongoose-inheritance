var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    ManagerSchema = new BaseSchema({ department: String });
    Manager = User.discriminator('Manager', ManagerSchema);

module.exports = Manager;
