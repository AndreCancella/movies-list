import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entity/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { redisStore } from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    providers: [UserService],
    exports: [UserService],
    controllers: [UserController],
  })
export class UserModule {}
