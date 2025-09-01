import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import winston from 'winston';

import { Comment } from './models/comment';
import { Topic } from './models/topic';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [new winston.transports.File({ filename: 'logs/sql.log' })],
});

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } = process.env;

const sequelizeOptions: SequelizeOptions = {
  host: 'postgres',
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
  models: [Comment, Topic],
  logging: (msg) => logger.info(msg),
};

const sequelize = new Sequelize(sequelizeOptions);

export const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Sequelize connection successful');

    await sequelize.sync({ alter: true });
    console.log('✅ Database synchronized');
  } catch (err) {
    console.error('❌ Database initialization failed:', err);
    process.exit(1);
  }
};
