'use strict';

const path = require('path');
const Sequelize = require('sequelize');
const MODELS = Symbol('loadedModels');
const chalk = require('chalk');

Sequelize.prototype.log = function() {
  if (this.options.logging === false) { return; }
  const args = Array.prototype.slice.call(arguments);
  const sql = args[0].replace(/Executed \(.+?\):\s{0,1}/, '');
  this.options.logging.info('[model]', chalk.magenta(sql), `(${args[1]}ms)`);
};

module.exports = app => {
  const defaultConfig = {
    logging: app.logger,
    host: 'localhost',
    port: 3306,
    username: 'root',
    benchmark: true,
    define: {
      freezeTableName: false,
      underscored: true,
    },
    modelDir: 'app/model',
    modelAccessName: 'model',
  };
  const config = Object.assign(defaultConfig, app.config.sequelize);

  app.Sequelize = Sequelize;

  const sequelize = new Sequelize(config.database, config.username, config.password, config);

  // app.sequelize
  Object.defineProperty(app, config.modelAccessName, {
    value: sequelize,
    writable: false,
    configurable: false,
  });

  loadModel(app, config);

  app.beforeStart(function* () {
    yield app.model.authenticate();
  });
};

function loadModel(app, config) {
  const modelDir = path.join(app.baseDir, config.modelDir);
  app.loader.loadToApp(modelDir, MODELS, {
    inject: app,
    caseStyle: 'upper',
    ignore: 'index.js',
  });

  for (const name of Object.keys(app[MODELS])) {
    app[config.modelAccessName][name] = app[MODELS][name];
  }

  for (const name of Object.keys(app.model)) {
    const instance = app[config.modelAccessName][name];
    // only this Sequelize Model class
    if (!(instance instanceof app.Sequelize.Model)) {
      continue;
    }

    if ('associate' in instance) {
      instance.associate();
    }
  }
}
