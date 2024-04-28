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


const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'mysecretpassword',
  database: 'movie_list',
  entities: [Movies, Users],
  synchronize: true,
};


@Module({
  imports: [TypeOrmModule.forRoot(dbConfig),
    AuthModule, MoviesModule, UserModule,     CacheModule.register({
      useFactory: () => ({
        store: redisStore,
        host: 'localhost',
        port: 6379,
      }),
    }),
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}