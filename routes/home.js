/* GET home page. */
module.exports = function(req, res){
  var mongoose = require('mongoose');
  mongoose.model('User').find(
    function (err, users) {
      if (err) return console.error(err);
      res.render('home', { pageTitle: 'Mini Twitter', users: users });
    }
  );
};
