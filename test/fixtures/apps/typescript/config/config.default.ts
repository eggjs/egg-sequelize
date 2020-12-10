import * as path from 'path';
import {EggAppInfo, EggAppConfig, PowerPartial} from 'egg';

export default (appInfo: EggAppInfo) => {
    const config = {} as PowerPartial<EggAppConfig>;

    config.keys = '123123';

    config.sequelize = {
        Sequelize: require('sequelize-typescript').Sequelize,
        datasources: [
            {
                delegate: 'model',
                baseDir: 'model',
                database: 'test',
                dialect: 'mysql',
            },
            {
                delegate: 'sequelize',
                baseDir: 'sequelize',
                database: 'test1',
                dialect: 'mysql',
                exclude: 'Person.js',
            },
            {
                delegate: 'subproperty.a',
                baseDir: 'subproperty/a',
                database: 'test2',
                dialect: 'mysql',
            },
            {
                delegate: 'subproperty.b',
                baseDir: 'subproperty/b',
                database: 'test3',
                dialect: 'mysql',
            },
        ]
    }

    return config;
}
