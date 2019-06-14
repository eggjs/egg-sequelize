import * as sequelize from 'sequelize';

interface EggSequelizeOptions extends sequelize.Options {
  delegate?: string;
  baseDir?: string;
  exclude?: string;
  connectionUri?: string;
}

interface DataSources {
  datasources: EggSequelizeOptions[];
}

declare module 'egg' {
  interface IModel extends sequelize.Sequelize, PlainObject { }

  // extend app
  interface Application {
    Sequelize: typeof sequelize;
    model: IModel;
  }

  // extend context
  interface Context {
    model: IModel;
  }

  // extend your config
  interface EggAppConfig {
    sequelize: EggSequelizeOptions | DataSources;
  }

}
