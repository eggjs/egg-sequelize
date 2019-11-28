import { Controller } from 'egg';

export default class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.model.Monkey.findUser();
    await ctx.model.User.associate();
    await ctx.model.User.test();
  }
}
