'use strict';

const path = require('path');
const Sequelize = require('sequelize');
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
  };
  const config = Object.assign({}, defaultConfig, app.config.sequelize);

  app.Sequelize = Sequelize;

  if (config.clients) {
    // app.sequelize
    Object.defineProperty(app, 'model', {
      value: {},
      writable: false,
      configurable: false,
    });

    for (const name of Object.keys(config.clients)) {
      const clientConfig = Object.assign({}, defaultConfig, app.config.sequelize.default, app.config.sequelize.clients[name]);

      const sequelize = new Sequelize(clientConfig.database, clientConfig.username, clientConfig.password, clientConfig);

      Object.defineProperty(app.model, name, {
        value: sequelize,
        writable: false,
        configurable: false,
      });

      loadModel(app, { instance: sequelize, modelDir: clientConfig.modelDir, name });
    }
  } else {
    const sequelize = new Sequelize(config.database, config.username, config.password, config);
    // app.sequelize
    Object.defineProperty(app, 'model', {
      value: sequelize,
      writable: false,
      configurable: false,
    });
    loadModel(app, { instance: sequelize, modelDir: config.modelDir });
  }

  app.beforeStart(function* () {
    if (app.config.sequelize.clients) {
      for (const name of Object.keys(config.clients)) {
        yield app.model[name].authenticate();
      }
    } else {
      console.log(app.config.sequelize.name);
      yield app.model.authenticate();
    }
  });
};

function loadModel(app, options) {
  const MODELS = Symbol(`loadedModels${options.name ? ('#' + options.name) : ''}`);

  const modelDir = path.join(app.baseDir, options.modelDir);
  app.loader.loadToApp(modelDir, MODELS, {
    inject: app,
    caseStyle: 'upper',
    ignore: 'index.js',
  });

  for (const name of Object.keys(app[MODELS])) {
    const klass = app[MODELS][name];

    // only this Sequelize Model class
    if ('sequelize' in klass) {
      options.instance[name] = klass;

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
