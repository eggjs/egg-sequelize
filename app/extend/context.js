'use strict';
const MODEL = Symbol('Context#model');
module.exports = {
  get model() {
    if (!this[MODEL]) {
      this[MODEL] = this.app.sequelize.models;
    }
    return this[MODEL];
  },
};
