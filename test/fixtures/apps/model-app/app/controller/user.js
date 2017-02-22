'use strict';

module.exports = app => {
  return class UserController extends app.Controller {
    * index() {
      const users = yield this.ctx.model.User.findAll();
      this.ctx.body = users.map(user => user.get());
    }

    * create() {
      yield app.model.User.create({
        name: this.ctx.request.body.name,
      });
    }
  };
};
