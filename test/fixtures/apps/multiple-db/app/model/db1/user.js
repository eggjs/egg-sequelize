'use strict';

const assert = require('assert');

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  const User = app.model.db1.define('user', {
    name: STRING(30),
    age: INTEGER,
  });

  User.associate = function() {
    assert.ok(app.model.db1.User);
    assert.ok(app.model.db1.Post);
    app.model.db1.User.hasMany(app.model.db1.Post, { as: 'posts', foreignKey: 'user_id' });
  };

  User.test = function* () {
    assert(app.config);
    assert(app.model.db1.User === this);
  };

  return User;
};
