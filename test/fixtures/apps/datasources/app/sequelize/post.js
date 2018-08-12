'use strict';

const assert = require('assert');

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  const Post = app.sequelize.define('post', {
    user_id: INTEGER,
    name: STRING(30),
  });

  Post.associate = function() {
    assert.ok(app.sequelize.User);
    assert.ok(app.sequelize.Post);
    app.sequelize.Post.belongsTo(app.sequelize.User, { as: 'user', foreignKey: 'user_id' });
  };

  return Post;
};
