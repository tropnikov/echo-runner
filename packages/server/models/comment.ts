import { Model, Table, Column, DataType, AutoIncrement, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { Topic } from './topic';

@Table({
  tableName: 'comments',
})
export class Comment extends Model<InferAttributes<Comment>, InferCreationAttributes<Comment>> {
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
    field: 'owner_login',
    allowNull: false,
  })
  declare ownerLogin: string;
  @ForeignKey(() => Comment)
  @Column({
    type: DataType.INTEGER,
    field: 'reply_comment_id',
    allowNull: true,
  })
  declare replyCommentId: CreationOptional<number | null>;
  @BelongsTo(() => Comment)
  declare replyTo: CreationOptional<Comment>;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare text: string;
  @ForeignKey(() => Topic)
  @Column({
    type: DataType.INTEGER,
    field: 'topic_id',
    allowNull: false,
  })
  declare topicId: number;
  @BelongsTo(() => Topic)
  declare topic: CreationOptional<Topic>;
}
