// Load module dependencies
var express = require('express'),
    bodyParser = require('body-parser'),
    muexpress = require('./lib/mu-express'),
    http = require('http'),
    path = require('path'),
    routes = require('./lib/load')('./routes/'),
    mongoose = require('mongoose'),
    app = express();

require('./models/user');
// Connect to mongodb
mongoose.connect('mongodb://localhost/prototype-mongoose-inheritance');

// Setup express
app.set('views', __dirname + '/views');     // setup the views
app.engine('html', muexpress.__express);    // register the mu-templating engine
app.set('view engine', 'html');             // register template engine as HTML
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// Setup routes
app.use(app.router);

app.get('/', routes.home);

var server = app.listen(3001, function() {
    if (process.env.NODE_ENV !== 'production') console.log('Listening on port %s', server.address().port);
});
