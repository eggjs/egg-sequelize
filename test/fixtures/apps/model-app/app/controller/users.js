'use strict';

module.exports = app => {
  return class UsersController extends app.Controller {
    async show() {
      const user = await this.ctx.model.User.findByPk(this.ctx.params.id);
      this.ctx.body = user;
    }

    async create() {
      await app.model.User.create({
        name: this.ctx.request.body.name,
      });
    }
  };
};
