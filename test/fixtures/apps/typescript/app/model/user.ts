import {Application} from 'egg';
import assert = require('assert');
import {Column, DataType, Model, Table} from "sequelize-typescript";

@Table({tableName: 'user'})
class User extends Model<User> {
    @Column(DataType.STRING(3))
    name: string

    @Column(DataType.INTEGER)
    age: number
}

export default function (app: Application) {
    return class extends User {
        static async associate() {
            assert.ok(app.model.User);
        }

        static async test() {
            assert(app.config);
            assert(app.model.User === this);
            const monkey = await app.model.Monkey.create({name: 'The Monkey'});
            assert(monkey.isNewRecord === false);
        }
    }
}
