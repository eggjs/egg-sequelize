import * as sequelize from "sequelize";

interface DataSources {
  [datasources]: sequelize.Options;
}

declare module 'egg' {

  // extend app
  interface Application {
    Sequelize: sequelize.SequelizeStatic;
    model: sequelize.Sequelize;
  }

  // extend context
  interface Context {
    model: sequelize.Sequelize;
  }

  // extend your config
  interface EggAppConfig {
    sequelize: sequelize.Options | DataSources;
  }

}
