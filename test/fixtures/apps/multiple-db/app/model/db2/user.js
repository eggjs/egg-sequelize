'use strict';

const assert = require('assert');

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  const User = app.model.db2.define('user', {
    name: STRING(30),
    age: INTEGER,
  });

  User.associate = function() {
    assert.ok(app.model.db2.User);
    assert.ok(app.model.db2.Post);
    app.model.db2.User.hasMany(app.model.db2.Post, { as: 'posts', foreignKey: 'user_id' });
  };

  User.test = function* () {
    assert(app.config);
    assert(app.model.db2.User === this);
  };

  return User;
};
