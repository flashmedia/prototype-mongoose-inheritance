/* GET User page. */
module.exports = function(req, res){
  var mongoose = require('mongoose');
  mongoose.model('User').findOne( { username: req.params.username}, function(err,user){
    if (err) return console.error(err);
    res.render('User', { pageTitle: user.fullname, user: user });
  });
};
