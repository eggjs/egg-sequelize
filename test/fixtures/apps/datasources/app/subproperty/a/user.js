'use strict';

const assert = require('assert');

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  const User = app.subproperty.a.define('user', {
    name: STRING(30),
    age: INTEGER,
  });

  User.associate = function() {
    assert.ok(app.subproperty.a.User);
    assert.ok(app.subproperty.a.Post);
    app.subproperty.a.User.hasMany(app.subproperty.a.Post, { as: 'posts', foreignKey: 'user_id' });
  };

  User.test = async function() {
    assert(app.config);
    assert(app.subproperty.a.User === this);
    const monkey = await app.subproperty.a.Monkey.create({ name: 'The Monkey' });
    assert(monkey.id);
    assert(monkey.isNewRecord === false);
    assert(monkey.name === 'The Monkey');
  };

  return User;
};
