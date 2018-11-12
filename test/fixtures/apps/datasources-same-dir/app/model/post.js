'use strict';

const assert = require('assert');

module.exports = (app, model) => {
  const { INTEGER, STRING } = app.Sequelize;
  const Post = model.define('post', {
    user_id: INTEGER,
    name: STRING(30),
  });

  Post.associate = function() {
    assert.ok(model.User);
    assert.ok(model.Post);
    model.Post.belongsTo(model.User, { as: 'user', foreignKey: 'user_id' });
  };

  return Post;
};
