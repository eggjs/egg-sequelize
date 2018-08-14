'use strict';

const assert = require('assert');

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  const User = app.model.define('user', {
    name: STRING(30),
    age: INTEGER,
  });

  User.associate = function() {
    assert.ok(app.model.User);
    assert.ok(app.model.Sub.Post);
    app.model.User.hasMany(app.model.Sub.Post, { as: 'posts', foreignKey: 'user_id' });
  };

  return User;
};
