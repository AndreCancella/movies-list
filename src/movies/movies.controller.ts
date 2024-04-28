import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards} from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movies } from '../entity/movies.entity'; 
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async getAllMovies(): Promise<Movies[]> {
    return this.movieService.findAll();
  }

  @Post()
  async createMovie(@Body() movieData: Partial<Movies>): Promise<Movies> {
    return this.movieService.create(movieData);

  }

  @Put(':id')
  async updateMovie(@Param('id') id: number, @Body() movieData: Partial<Movies>): Promise<Movies> {
    return this.movieService.update(id, movieData);
  }
  // Implemente outros métodos conforme necessário para atualizar, excluir, etc.
}
