/* eslint-disable @typescript-eslint/no-unused-vars */
import { Model, Table, Column, DataType, AutoIncrement, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { Topic } from './topic';

@Table({
  tableName: 'reactions',
  timestamps: true,
})
export class Reaction extends Model<InferAttributes<Reaction>, InferCreationAttributes<Reaction>> {
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

  @ForeignKey(() => Topic)
  @Column({
    type: DataType.INTEGER,
    field: 'topic_id',
    allowNull: false,
  })
  declare topicId: number;

  @Column({
    type: DataType.STRING(64),
    allowNull: false,
  })
  declare emoji: string;

  @BelongsTo(() => Topic)
  declare topic: CreationOptional<Topic>;
}
