import dotenv from 'dotenv';
import { join } from 'path';
import { DataSource } from 'typeorm';

dotenv.config();

export const datasource = new DataSource({
  // SETTINGS
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USERNAME,

  // METADATA
  entities: [join(__dirname, '../**/infra/typeorm/models/*.model.{ts,js}')],
  migrations: [__dirname + '/migrations/*.{ts,.js}'],
});
