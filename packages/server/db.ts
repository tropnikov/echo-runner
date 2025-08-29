import { Client } from 'pg';
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
console.log(POSTGRES_PORT);
const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
  models: [Comment, Topic],
  logging: (msg) => logger.info(msg),
};

const sequelize = new Sequelize(sequelizeOptions);

const checkPostgres = async () => {
  const client = new Client({
    host: 'localhost',
    port: Number(POSTGRES_PORT) || 5432,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
  });

  try {
    await client.connect();
    const res = await client.query('SELECT version()');
    console.log('✅ Connected to Postgres version:', res.rows[0].version);
  } catch (err) {
    console.error('❌ Cannot connect to Postgres:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
};

export const initializeDatabase = async () => {
  try {
    await checkPostgres();

    await sequelize.authenticate();
    console.log('✅ Sequelize connection successful');

    await sequelize.sync({ alter: true });
    console.log('✅ Database synchronized');
  } catch (err) {
    console.error('❌ Database initialization failed:', err);
    process.exit(1);
  }
};
