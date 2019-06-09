import 'egg';
import 'egg-sequelize';
import HomeController from '../app/controller/home';
import MonkeyModel from '../app/model/monkey';
import UserModel from '../app/model/user';

declare module 'egg' {
  interface IController {
    home: HomeController;
  }

  interface IModel {
    Monkey: ReturnType<typeof MonkeyModel>;
    User: ReturnType<typeof UserModel>;
  }
}