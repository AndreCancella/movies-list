import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'mysecretpassword',
  database: 'movie_list',
  entities: ["src/entity/*{.js}"],
  migrations: ["src/migration/*{.js}"],
  logging: true,
  synchronize: true,
  migrationsRun: true,
  migrationsTableName: 'history',
});