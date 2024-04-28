import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movies } from '../entity/movies.entity'; 
import { MovieService } from './movie.service';
import { MoviesController } from './movies.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Movies])],
  providers: [MovieService],
  exports: [MovieService],
  controllers: [MoviesController],
})
export class MoviesModule {}