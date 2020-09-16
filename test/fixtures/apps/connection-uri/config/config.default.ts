import * as path from 'path';
import { EggAppInfo, EggAppConfig, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  config.keys = '123123';

  config.sequelize = {
    app: true,
    agent: true,
  }

  return config;
}
