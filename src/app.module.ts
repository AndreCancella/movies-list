import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Movies } from './entity/movies.entity';
import { MoviesModule } from './movies/movies.module';
import { Module} from '@nestjs/common';
import { UserModule } from './user/user.module';
import { Users } from './entity/user.entity';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import {ConfigModule, ConfigService} from '@nestjs/config'


const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_URL,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [Movies, Users],
  synchronize: true,
};


@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), ConfigModule.forRoot({isGlobal: true}),
    AuthModule, MoviesModule, UserModule,     CacheModule.register({
      useFactory: () => ({
        store: redisStore,
        host: process.env.REDIS_URL,
        port: process.env.REDIS_PORT,
      }),
    }),
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}