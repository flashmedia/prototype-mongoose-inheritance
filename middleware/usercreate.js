module.exports = function (req, res, next) {

    var mongoose = require('mongoose'),
        User = mongoose.model('User'),
        Manager = mongoose.model('Manager');


    if(req.body.user.bManager){

        console.log('This is a manager');

        var newUser = new Manager({
            firstname: req.body.user.firstname,
            lastname: req.body.user.lastname,
            username: req.body.user.username,
            email: req.body.user.email,
            password: req.body.user.password,
            department: 'Flash Media'
        });
    }
    else{
        console.log('This is a user');

        var newUser = new User({
            firstname: req.body.user.firstname,
            lastname: req.body.user.lastname,
            username: req.body.user.username,
            email: req.body.user.email,
            password: req.body.user.password
        });

    }

    newUser.save(function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log('user: ' + newUser.username + " saved.");
        }
    });


    //save new User to db
    newUser.save(function (err, newUser) {
        if (err) return console.error(err);
        //assign User data to request variable
        req.savedUser = newUser;
        next();
    });

};
