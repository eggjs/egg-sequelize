'use strict';
const path = require('path');
const mkdirp = require('mkdirp');

const migrationsPath = path.resolve('migrations');
const modelsPath = path.resolve('app/model');

mkdirp.sync(migrationsPath);
mkdirp.sync(modelsPath);

module.exports = {
  config: path.resolve('./node_modules/egg-sequelize/lib/database.js'),
  'migrations-path': migrationsPath,
  'models-path': modelsPath,
};
