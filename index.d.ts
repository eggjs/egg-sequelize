import Sequelize from "sequelize";

declare module 'egg' {

  // extend service
  interface IService {

  }

  // extend app
  interface Application {
    Sequelize: Sequelize;
    model: Sequelize.Sequelize;
  }

  // extend context
  interface Context {
    Sequelize: Sequelize;
    model: Sequelize.Sequelize;
  }

  // extend your config
  interface EggAppConfig {
    sequelize: {
      dialect: string;
      database: string;
      host: string;
      port: string;
      username: string;
      password: string;
    };
  }

}