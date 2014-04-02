var path = require('path');

exports.__express = function (path, options, callback) {

  var mu = require('mu2');
  var result = '';

  mu.root = __dirname + '/../views';

  if (process.env.NODE_ENV !== 'production') {
    mu.clearCache();
  }

  var stream = mu.compileAndRender(path, options)
  .on('data', function (data) {
    result += data.toString();
  })
  .on('end', function () {
    callback(null, result);
  });

};
