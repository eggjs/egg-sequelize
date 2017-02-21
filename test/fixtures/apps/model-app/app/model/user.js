'use strict';

const assert = require('assert');

module.exports = model => {
  return model.define('user', {
    name: model.Sequelize.STRING(30),
    age: model.Sequelize.INTEGER,
  }, {
    classMethods: {
      associate(models) {
        assert.ok(models.user);
      },
    },
  });
};
