'use strict';

const assert = require('assert');

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  const Post = app.model.define('post', {
    user_id: INTEGER,
    name: STRING(30),
  });

  Post.associate = function() {
    assert.ok(app.model.User);
    assert.ok(app.model.Post);
    app.model.Post.belongsTo(app.model.User, { as: 'user', foreignKey: 'user_id' });
  };

  return Post;
};
