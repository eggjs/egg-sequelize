'use strict';

const ContextSequelize = Symbol('ContextSequelize');

module.exports = {
  get model() {
    let model = this[ContextSequelize];
    if (!model) {
      model = this[ContextSequelize] = new this.app.ContextSequelize(this);
    }
    return model;
  },
};
