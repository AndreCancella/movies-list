import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'ep-calm-mode-a5c9sx3v.us-east-2.aws.neon.tech',
  port: 5432,
  username: 'neondb_owner',
  password: 'zSZBlqhH1mo9',
  database: 'neondb',
  entities: ["src/entity/*{.js}"],
  migrations: ["src/migration/*{.js}"],
  logging: true,
  synchronize: true,
  migrationsRun: true,
  migrationsTableName: 'history',
});
