import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movies } from '../entity/movies.entity';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { AuthGuard } from '../auth/auth.guard';
import { getRedis, setRedis } from 'src/config/redis';
import { ApiBearerAuth, ApiHeader, ApiNotFoundResponse, ApiOperation, ApiParam, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@Controller('movies')
@ApiBearerAuth()
@ApiSecurity('bearerAuth')
@ApiTags('movies')
export class MoviesController {
  constructor(private readonly movieService: MovieService) { }

  @Get()
  async getAllMovies(): Promise<Movies[]> {
    return this.movieService.findAll();
  }


  @ApiOperation({ summary: 'Obter filme por ID' })
  @ApiParam({ name: 'id', description: 'ID do filme', type: 'number' })
  @ApiResponse({ status: 200, description: 'Filme encontrado', type: Movies })
  @ApiNotFoundResponse({ description: 'Filme não encontrado' })
  @Get(':id')
  async getMovie(@Param('id') id: number) {
    const movie = await this.movieService.findById(id);
    const redisData = await getRedis(`movie-${movie.id}`);
    const cachedMovie = redisData ? JSON.parse(redisData) : null;
    return { movie: cachedMovie || movie };
  }

  @Post()
  async createMovie(@Body() movieData: Partial<Movies>): Promise<Movies> {
    const movies = await this.movieService.create(movieData);
    await setRedis(`user-${movies.id}`, JSON.stringify(movies));
    return movies;
  }

  @Put(':id')
  async updateMovie(@Param('id') id: number, @Body() movieData: Partial<Movies>): Promise<Movies> {
    return this.movieService.update(id, movieData);
  }
}
