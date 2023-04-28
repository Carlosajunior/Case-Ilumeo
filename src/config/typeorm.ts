import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

console.log(process.env.POSTGRES_PORT);
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT as string),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: false,
  logging: false,
  entities: [],
  subscribers: [],
  migrations: ['./dist/migrations/*.js'],
});
