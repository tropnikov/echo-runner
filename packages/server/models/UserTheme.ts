/* eslint-disable @typescript-eslint/no-unused-vars */
import { Table, Model, Column, DataType, AutoIncrement, PrimaryKey, Index } from 'sequelize-typescript';

/* eslint-enable @typescript-eslint/no-unused-vars */
export interface UserThemeCreationAttributes {
  theme: string;
  userId: number;
}

@Table({
  timestamps: false,
  tableName: 'user_theme',
})
export class UserTheme extends Model<UserTheme, UserThemeCreationAttributes> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare theme: string;

  @Index
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
  declare userId: number;
}
