'use strict';
const { Sequelize, Model } = require('../../../../../../index');
const { STRING, INTEGER, DATE } = Sequelize;

class MonkeyEs6 extends Model {
  static get modelOptions() {
    return {
      modelName: 'monkey',
      attributes: {
        name: {
          type: STRING,
          allowNull: false,
        },
        user_id: INTEGER,
        created_at: DATE,
        updated_at: DATE,
      },
      options: {
        tableName: 'the_monkeys_se6',

        classMethods: {
        },

        instanceMethods: {
        },
      },
    };
  }

  static async findUser() {
    const user = await this.app.model.User.find({ id: 1 });
    return user;
  }
}

module.exports = MonkeyEs6;
