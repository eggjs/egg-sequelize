'use strict';

module.exports = app => {
  return class UserController extends app.Controller {
    * index() {
      const users = yield this.ctx.model.user.findAll();
      this.ctx.body = users.map(user => user.get());
    }

    * create() {
      yield this.ctx.model.user.create({
        name: this.ctx.request.body.name,
      });
    }
  };
};
