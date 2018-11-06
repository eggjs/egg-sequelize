'use strict';

const assert = require('assert');

module.exports = (app, model) => {
  const { STRING, INTEGER } = app.Sequelize;
  const User = model.define('user', {
    name: STRING(30),
    age: INTEGER,
  });

  User.associate = function() {
    assert.ok(model.User);
    assert.ok(model.Post);
    model.User.hasMany(model.Post, { as: 'posts', foreignKey: 'user_id' });
  };

  User.test = async function() {
    assert(app.config);
    assert(model.User === this);
    const monkey = await model.Monkey.create({ name: 'The Monkey' });
    assert(monkey.id);
    assert(monkey.isNewRecord === false);
    assert(monkey.name === 'The Monkey');
  };

  return User;
};
