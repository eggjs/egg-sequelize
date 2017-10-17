'use strict';

const path = require('path');
const Sequelize = require('sequelize');
const MODELS = Symbol('loadedModels');
const chalk = require('chalk');

Sequelize.prototype.log = function() {
  if (this.options.logging === false) {
    return;
  }
  const args = Array.prototype.slice.call(arguments);
  const sql = args[0].replace(/Executed \(.+?\):\s{0,1}/, '');
  this.options.logging.info('[model]', chalk.magenta(sql), `(${args[1]}ms)`);
};

module.exports = app => {
  if (Array.isArray(app.config.sequelize)) {
    for (const item of app.config.sequelize) {
      setConfig(item);
    }
  } else {
    setConfig(app.config.sequelize);
  }

  app.Sequelize = Sequelize;

  loadModel(app);

  function setConfig(sequelizeConfig) {
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
    };
    const config = Object.assign(defaultConfig, sequelizeConfig);
    const sequelize = new Sequelize(config.database, config.username, config.password, config);
    // app.sequelize
    const name = config.dbname ? `model_${config.dbname}` : 'model';
    Object.defineProperty(app, name, {
      value: sequelize,
      writable: false,
      configurable: false,
    });
    app.beforeStart(function* () {
      yield app[name].authenticate();
    });
  }
};

function loadModel(app) {
  const modelDir = path.join(app.baseDir, 'app/model');
  app.loader.loadToApp(modelDir, MODELS, {
    inject: app,
    caseStyle: 'upper',
    ignore: 'index.js',
  });

  for (const name of Object.keys(app[MODELS])) {
    const klass = app[MODELS][name];
    // only this Sequelize Model class
    if ('sequelize' in klass) {
      const dbname = klass.sequelize.options.dbname;
      app[dbname ? `model_${dbname}` : 'model'][name] = klass;

      if ('classMethods' in klass.options || 'instanceMethods' in klass.options) {
        app.logger.error(`${name} model has classMethods/instanceMethods, but it was removed supports in Sequelize V4.\
see: http://docs.sequelizejs.com/manual/tutorial/models-definition.html#expansion-of-models`);
      }
    }
  }

  for (const name of Object.keys(app[MODELS])) {
    const klass = app[MODELS][name];

    if ('associate' in klass) {
      klass.associate();
    }
  }
}
