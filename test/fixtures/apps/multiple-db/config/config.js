'use strict';

exports.sequelize = {
  clients: {
    db1: {
      database: 'test1',
      name: 'db1',
      modelDir: 'app/model/db1',
    },
    db2: {
      database: 'test2',
      name: 'db2',
      modelDir: 'app/model/db2',
    },
  },
  default: {
    port: '3306',
    host: '127.0.0.1',
    username: 'root',
    password: '',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    storage: 'db/test-foo.sqlite',
    timezone: '+08:01',
  },
};

exports.keys = '0jN4Fw7ZBjo4xtrLklDg4g==';
