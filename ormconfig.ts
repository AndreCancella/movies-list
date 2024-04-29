import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_URL,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ["src/entity/*{.js}"],
  migrations: ["src/migration/*{.js}"],
  logging: true,
  synchronize: true,
  migrationsRun: true,
  migrationsTableName: 'history',
});
