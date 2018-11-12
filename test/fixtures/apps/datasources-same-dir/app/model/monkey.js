'use strict';

module.exports = (app, model) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Monkey = model.define('monkey', {
    name: {
      type: STRING,
      allowNull: false,
    },
    user_id: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  }, {
    tableName: 'the_monkeys',

    classMethods: {
    },

    instanceMethods: {
    },
  });

  Monkey.findUser = async function() {
    return model.User.find({ id: 1 });
  };

  return Monkey;
};
