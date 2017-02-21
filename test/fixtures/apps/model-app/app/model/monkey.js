'use strict';

module.exports = model => {
  return model.define('monkey', {
    name: {
      type: model.Sequelize.STRING,
      allowNull: false,
    },
    user_id: model.Sequelize.INTEGER,
    created_at: model.Sequelize.DATE,
    updated_at: model.Sequelize.DATE,
  }, {
    classMethods: {
      * findUser() {
        return yield model.user.find({ id: 1 });
      },
    },
  });
};
