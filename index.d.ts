import Sequelize from "sequelize";

declare module 'egg' {

  // extend app
  interface Application {
    Sequelize: Sequelize;
    model: Sequelize.Sequelize;
  }

  // extend context
  interface Context {
    model: Sequelize.Sequelize;
  }

  // extend your config
  interface EggAppConfig {
    sequelize: {
      dialect: string;
      database: string;
      host: string;
      port: number;
      username: string;
      password: string;
    };
  }

}