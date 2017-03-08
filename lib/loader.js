'use strict';

const assert = require('assert');
const path = require('path');
const Sequelize = require('sequelize');
const MODELS = Symbol('loadedModels');

module.exports = app => {
  const config = Object.assign(app.config.sequelize, { logging });

  app.Sequelize = Sequelize;

  assert(config.database, 'config.database is required');
  assert(config.username, 'config.username is required');
  assert(config.host, 'config.host is required');
  assert(config.port, 'config.port is required');

  const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      host: config.host,
      port: config.port,
      dialect: config.dialect,
      logging: config.logging,
      benchmark: true,
      define: {
        freezeTableName: false,
      },
    }
  );

  // app.sequelize
  Object.defineProperty(app, 'model', {
    value: sequelize,
    writable: false,
    configurable: false,
  });

  loadModel(app);

  app.beforeStart(function* () {
    yield app.model.authenticate();
  });

  function logging(str) {
    app.coreLogger.info(`[egg-sequelize] ${str}`);
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
    app.model[name] = app[MODELS][name];
  }

  for (const name of Object.keys(app.model)) {
    const instance = app.model[name];
    // only this Sequelize Model class
    if (!(instance instanceof app.Sequelize.Model)) {
      continue;
    }

    if ('associate' in instance) {
      instance.associate();
    }
  }
}
