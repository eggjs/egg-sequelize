'use strict';

module.exports = app => {
  return class UsersController extends app.Controller {
    * show() {
      const user = yield this.ctx.model.User.findById(this.ctx.params.id);
      this.ctx.body = user;
    }

    * create(ctx) {
      if (ctx.query.space_id) {
        ctx.space_id = parseInt(ctx.query.space_id);
      }
      yield ctx.model.User.create({
        name: ctx.request.body.name,
      });
    }
  };
};
