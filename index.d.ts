import * as sequelize from "sequelize";

interface EggSequelizeOptions extends sequelize.Options {
  delegate?: string;
  baseDir?: string;
}

interface DataSources {
  [datasources]: EggSequelizeOptions;
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
    sequelize: EggSequelizeOptions | DataSources;
  }

}
