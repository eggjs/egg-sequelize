'use strict';

exports.sequelize = {
  port: '3306',
  host: 'localhost',
  username: 'root',
  password: '',
  database: 'test',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  storage: 'db/test-foo.sqlite',
  timezone: '+08:01',
};
