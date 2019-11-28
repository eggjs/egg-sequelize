import {Column, DataType, Model, Table} from "sequelize-typescript";

@Table({
    tableName: 'the_monkeys'
})
class Monkey extends Model<Monkey> {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name: string

    @Column({type: DataType.INTEGER})
    user_id: number

    @Column(DataType.DATE)
    created_at: Date

    @Column(DataType.DATE)
    updated_at: Date

    static async findUser() {
        return this.findOne({where: {id: '123'}})
    }
}

export default () => Monkey
