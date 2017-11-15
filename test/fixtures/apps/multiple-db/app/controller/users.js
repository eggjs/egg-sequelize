'use strict';

module.exports = app => {
  return class UsersController extends app.Controller {
    * show() {
      const user = yield this.ctx.model.db1.User.findById(this.ctx.params.id);
      this.ctx.body = user;
    }

    * create() {
      yield app.model.db1.User.create({
        name: this.ctx.request.body.name,
      });
    }
  };
};
