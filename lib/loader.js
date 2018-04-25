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
  if (!app.config.sequelize.client && !app.config.sequelize.clients) {
    app.config.sequelize = {
      client: app.config.sequelize
    };
  }

  app.Sequelize = Sequelize;
  app.addSingleton('sequelize', (config, app) => {
    config = Object.assign({
      logging: app.logger,
      benchmark: true,
      define: {
        freezeTableName: false,
        underscored: true,
      },
    }, config);
    return new Sequelize(config.database, config.username, config.password, config);
  });
  app.model = app.sequelize;

  loadModel(app);

  app.beforeStart(function* () {
    if (app.model.clients instanceof Map) {
      for (const client of app.model.clients) {
        yield client[1].authenticate();
      }
    } else {
      yield app.model.authenticate();
    }
  });
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
      app.model[name] = klass;

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
