const path = require('path');

module.exports = {
  config: path.resolve('./node_modules/egg-sequelize/lib/database.js'),
  'migrations-path': path.resolve('migrations'),
};
