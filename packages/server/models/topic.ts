import { Model, Table, Column, DataType, AutoIncrement, PrimaryKey, HasMany } from 'sequelize-typescript';
import { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { Comment } from './comment';

@Table({
  tableName: 'topics',
})
export class Topic extends Model<InferAttributes<Topic>, InferCreationAttributes<Topic>> {
  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare id: CreationOptional<number>;
  @Column({
    type: DataType.INTEGER,
    field: 'owner_id',
    allowNull: false,
  })
  declare ownerId: number;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;
  @HasMany(() => Comment)
  declare comments: CreationOptional<Comment[]>;
}
