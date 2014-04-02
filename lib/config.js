var config = require('nconf'),
    log = require('./logger'),
    path = require('path'),
    configPath = path.resolve(__dirname, '..', 'config');

// Load default dev config settings
config.file(configPath + '/dev.json');
log.info('Load default config.');

// Overwrite dev settings based on environment
if (process.env.NODE_ENV === 'production'){
    log.info('Load production config.');
    config.file(configPath + '/prod.json');
}
else if (process.env.NODE_ENV === 'staging'){
    log.info('Load staging config.');
    config.file(configPath + '/stage.json');
}

// Load config settings for environment variable and CLI
config.argv().env();

module.exports = config;
