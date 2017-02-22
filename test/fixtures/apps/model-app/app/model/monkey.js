'use strict';

module.exports = model => {
  const { Sequelize: { STRING, INTEGER, DATE } } = model;
  return model.define('monkey', {
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
        return yield model.User.find({ id: 1 });
      },
    },
  });
};
