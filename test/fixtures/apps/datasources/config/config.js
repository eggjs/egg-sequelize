'use strict';

exports.sequelize = {
  datasources: [
    {
      delegate: 'model',
      baseDir: 'model',
      database: 'test',
      dialect: 'mysql',
    },
    {
      delegate: 'sequelize',
      baseDir: 'sequelize',
      database: 'test1',
      dialect: 'mysql',
      exclude: 'Person.js',
    },
  ],
};

exports.keys = '0jN4Fw7ZBjo4xtrLklDg4g==';
