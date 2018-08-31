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
    {
      delegate: 'subproperty.a',
      baseDir: 'subproperty/a',
      database: 'test2',
      dialect: 'mysql',
    },
    {
      delegate: 'subproperty.b',
      baseDir: 'subproperty/b',
      database: 'test3',
      dialect: 'mysql',
    },
  ],
};

exports.keys = '0jN4Fw7ZBjo4xtrLklDg4g==';
