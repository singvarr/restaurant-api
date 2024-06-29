import 'dotenv/config';
import { join } from 'path';
import { DataSource } from 'typeorm';
import migrations from './migrations';

const entitiesPath = join(__dirname, 'src', '**', '**.entity{.ts,.js}');

const source = new DataSource({
  type: 'postgres',
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  database: process.env.DB_NAME,
  entities: [entitiesPath],
  migrations,
  migrationsTableName: 'migrations',
});

export default source;
