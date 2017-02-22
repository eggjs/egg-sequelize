'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  return app.model.define('monkey', {
    name: {
      type: STRING,
      allowNull: false,
    },
    user_id: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  }, {
    classMethods: {
      * findUser() {
        return yield app.model.User.find({ id: 1 });
      },
    },
  });
};
