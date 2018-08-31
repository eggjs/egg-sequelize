'use strict';

const assert = require('assert');

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  const User = app.subproperty.b.define('user', {
    name: STRING(30),
    age: INTEGER,
  });

  User.associate = function() {
    assert.ok(app.subproperty.b.User);
    assert.ok(app.subproperty.b.Post);
    app.subproperty.b.User.hasMany(app.subproperty.b.Post, { as: 'posts', foreignKey: 'user_id' });
  };

  User.test = async function() {
    assert(app.config);
    assert(app.subproperty.b.User === this);
    const monkey = await app.subproperty.b.Monkey.create({ name: 'The Monkey' });
    assert(monkey.id);
    assert(monkey.isNewRecord === false);
    assert(monkey.name === 'The Monkey');
  };

  return User;
};
