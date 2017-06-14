'use strict';
const path = require('path');

const configPath = path.resolve('./node_modules/egg-sequelize/lib/database.js');
const migrationsPath = path.resolve(require(configPath)[process.env.NODE_ENV || 'development'].migrationsPath || './migrations');

module.exports = {
  config: configPath,
  'migrations-path': migrationsPath,
};
