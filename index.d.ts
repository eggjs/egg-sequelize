import sequelize from "sequelize";

declare module 'egg' {

  // extend app
  interface Application {
    Sequelize: sequelize;
    model: sequelize.Sequelize;
  }

  // extend context
  interface Context {
    model: sequelize.Sequelize;
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