import * as path from 'path';
import { EggAppInfo, EggAppConfig, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  config.keys = '123123';

  config.sequelize = {
    connectionUri: 'mysql://root:@127.0.0.1:3306/test4',
    dialect: 'mysql'
  }

  return config;
}
