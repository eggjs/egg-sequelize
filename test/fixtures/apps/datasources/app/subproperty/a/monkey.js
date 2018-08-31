'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Monkey = app.subproperty.a.define('monkey', {
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
    return app.subproperty.a.User.find({ id: 1 });
  };

  return Monkey;
};
