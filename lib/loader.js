'use strict';

const path = require('path');
const sleep = require('mz-modules/sleep');
const AUTH_RETRIES = Symbol('authenticateRetries');

module.exports = app => {
  const defaultConfig = {
    delegate: 'model',
    baseDir: 'model',
    logging(...args) {
      // if benchmark enabled, log used
      const used = typeof args[1] === 'number' ? `[${args[1]}ms]` : '';
      app.logger.info('[egg-sequelize]%s %s', used, args[0]);
    },
    host: 'localhost',
    port: 3306,
    username: 'root',
    benchmark: true,
    define: {
      freezeTableName: false,
      underscored: true,
    },
  };

  const config = app.config.sequelize;
  // support customize sequelize
  app.Sequelize = config.Sequelize || require('sequelize');

  const databases = [];
  if (!config.datasources) {
    databases.push(loadDatabase(Object.assign({}, defaultConfig, config)));
  } else {
    config.datasources.forEach(datasource => {
      databases.push(loadDatabase(Object.assign({}, defaultConfig, datasource)));
    });
  }

  app.beforeStart(async () => {
    await Promise.all(databases.map(database => authenticate(database)));
  });

  /**
   * load databse to app[config.delegate
   * @param {Object} config config for load
   *   - delegate: load model to app[delegate]
   *   - baeDir: where model located
   *   - other sequelize configures(databasem username, password, etc...)
   * @return {Object} sequelize instance
   */
  function loadDatabase(config) {
    const sequelize = new app.Sequelize(config.database, config.username, config.password, config);

    if (app[config.delegate] || app.context[config.delegate]) {
      throw new Error(`[egg-sequelize] app[${config.delegate}] or ctx[${config.delegate}] is already defined`);
    }

    Object.defineProperty(app, config.delegate, {
      value: sequelize,
      writable: false,
      configurable: false,
    });

    const DELEGATE = Symbol(`context#sequelize_${config.delegate}`);
    Object.defineProperty(app.context, config.delegate, {
      get() {
        // context.model is different with app.model
        // so we can change the properties of ctx.model.xxx
        if (!this[DELEGATE]) this[DELEGATE] = Object.create(app[config.delegate]);
        return this[DELEGATE];
      },
      configurable: false,
    });

    const modelDir = path.join(app.baseDir, 'app', config.baseDir);

    const models = [];
    const target = Symbol(config.delegate);
    app.loader.loadToApp(modelDir, target, {
      caseStyle: 'upper',
      ignore: config.ignore,
      filter(model) {
        if (!model || !model.sequelize) return false;
        models.push(model);
        return true;
      },
    });
    Object.assign(app[config.delegate], app[target]);

    models.forEach(model => {
      typeof model.associate === 'function' && model.associate();
    });

    return app[config.delegate];
  }

  /**
   * Authenticate to test Database connection.
   *
   * This method will retry 3 times when database connect fail in temporary, to avoid Egg start failed.
   * @param {Application} database instance of sequelize
   */
  async function authenticate(database) {
    database[AUTH_RETRIES] = database[AUTH_RETRIES] || 0;

    try {
      await database.authenticate();
    } catch (e) {
      if (e.name !== 'SequelizeConnectionRefusedError') throw e;
      if (app.model[AUTH_RETRIES] >= 3) throw e;

      // sleep 2s to retry, max 3 times
      database[AUTH_RETRIES] += 1;
      app.logger.warn(`Sequelize Error: ${e.message}, sleep 2 seconds to retry...`);
      await sleep(2000);
      await authenticate(app, database);
    }
  }
};
