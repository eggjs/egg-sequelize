import * as path from 'path';
import { EggAppInfo, EggAppConfig, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  config.keys = '123123';

  config.sequelize = {
    port: 3306,
    host: '127.0.0.1',
    username: 'root',
    password: '',
    database: 'test',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    storage: 'db/test-foo.sqlite',
    timezone: '+08:01',
  }

  return config;
}
