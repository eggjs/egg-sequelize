'use strict';

import { Application } from 'egg';

export default function(app: Application) {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Monkey = app.model.define('monkey', {
    name: {
      type: STRING,
      allowNull: false,
    },
    user_id: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  }, {
    tableName: 'the_monkeys',
  });

  return class extends Monkey {
    static async findUser() {
      return app.model.User.findOne({ where: { id: '123' } });
    }
  }
}
