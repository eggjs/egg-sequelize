'use strict';

const assert = require('assert');

module.exports = sequelize => {
  return sequelize.define('user', {
    name: {
      type: sequelize.Sequelize.STRING(30),
    },
  }, {
    classMethods: {
      associate(models) {
        assert.ok(models.user);
      },
    },
  });
};
