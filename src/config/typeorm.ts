import { config } from 'dotenv';
import { DataSource } from 'typeorm';

import { ClockIn } from '../modules/clock-in/entities/clock-in.entity';
import { Users } from '../modules/users/entities/users.entity';

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
  entities: [Users, ClockIn],
  subscribers: [],
  migrations: ['./dist/src/migrations/*.js'],
});
