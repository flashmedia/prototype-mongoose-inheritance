/* GET note page. */
module.exports = function(req, res){
  res.render('usersaved', { pageTitle: 'User saved', user: req.savedUser });
};
