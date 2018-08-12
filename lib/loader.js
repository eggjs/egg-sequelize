'use strict';

const path = require('path');
const Sequelize = require('sequelize');
const MODELS = Symbol('loadedModels');
const AUTH_RETRIES = Symbol('authenticateRetries');
const sleep = require('mz-modules/sleep');

module.exports = app => {
  const defaultConfig = {
    logging: app.logger.info.bind(app.logger),
    host: 'localhost',
    port: 3306,
    username: 'root',
    benchmark: true,
    define: {
      freezeTableName: false,
      underscored: true,
    },
  };

  const config = Object.assign(defaultConfig, app.config.sequelize);

  app.Sequelize = Sequelize;

  const sequelize = new Sequelize(config.database, config.username, config.password, config);

  // app.sequelize
  Object.defineProperty(app, 'model', {
    value: sequelize,
    writable: false,
    configurable: false,
  });

  loadModel(app);

  app.beforeStart(async function() {
    await authenticate(app);
  });
};

/**
 * Authenticate to test Database connection.
 *
 * This method will retry 3 times when database connect fail in temporary, to avoid Egg start failed.
 * @param {Application} app instance of Egg Application
 */
async function authenticate(app) {
  app.model[AUTH_RETRIES] = app.model[AUTH_RETRIES] || 0;

  try {
    await app.model.authenticate();
  } catch (e) {
    if (e.name !== 'SequelizeConnectionRefusedError') throw e;
    if (app.model[AUTH_RETRIES] >= 3) throw e;

    // sleep 2s to retry, max 3 times
    app.model[AUTH_RETRIES] += 1;
    app.logger.warn(`Sequelize Error: ${e.message}, sleep 2 seconds to retry...`);
    await sleep(2000);
    await authenticate(app);
  }
}

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
