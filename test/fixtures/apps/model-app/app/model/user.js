'use strict';

module.exports = sequelize => {
  return sequelize.define('user', {
    name: {
      type: sequelize.Sequelize.STRING(30),
    },
  });
};
