'use strict';

const assert = require('assert');

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  const User = app.sequelize.define('user', {
    name: STRING(30),
    age: INTEGER,
  });

  User.associate = function() {
    assert.ok(app.sequelize.User);
    assert.ok(app.sequelize.Post);
    app.sequelize.User.hasMany(app.sequelize.Post, { as: 'posts', foreignKey: 'user_id' });
  };

  User.test = async function() {
    assert(app.config);
    assert(app.sequelize.User === this);
    const monkey = await app.sequelize.Monkey.create({ name: 'The Monkey' });
    assert(monkey.id);
    assert(monkey.isNewRecord === false);
    assert(monkey.name === 'The Monkey');
  };

  return User;
};
