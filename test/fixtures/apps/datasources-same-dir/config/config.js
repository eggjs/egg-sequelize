'use strict';

exports.sequelize = {
  app: true,
  agent: true,
  datasources: [
    {
      delegate: 'model',
      baseDir: 'model',
      database: 'test',
      dialect: 'mysql',
    },
    {
      delegate: 'sequelize',
      baseDir: 'model',
      database: 'test1',
      dialect: 'mysql',
      exclude: 'Person.js',
    },
  ],
};

exports.keys = '0jN4Fw7ZBjo4xtrLklDg4g==';
