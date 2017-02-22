'use strict';

const assert = require('assert');

module.exports = model => {
  const { Sequelize: { STRING, INTEGER } } = model;
  return model.define('user', {
    name: STRING(30),
    age: INTEGER,
  }, {
    classMethods: {
      associate(model) {
        assert.ok(model.User);
      },
    },
  });
};
