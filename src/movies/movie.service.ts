import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movies } from '../entity/movies.entity'; 
import { FindOneOptions } from 'typeorm';


@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movies)
    private readonly movieRepository: Repository<Movies>,
  ) {}

  async findAll(): Promise<Movies[]> {
    return this.movieRepository.find();
  }

  async findById(id: number): Promise<Movies> {
    const options: FindOneOptions<Movies> = { where: { id: 1 } };
    return this.movieRepository.findOne(options);
  }

  async create(movieData: Partial<Movies>): Promise<Movies> {
    const movie = this.movieRepository.create(movieData);
    return this.movieRepository.save(movie);
  }

  async update(id: number, movieData: Partial<Movies>): Promise<Movies> {
    await this.movieRepository.update(id, movieData);
    const options: FindOneOptions<Movies> = { where: { id: 1 } };
    return this.movieRepository.findOne(options);
  }

  async delete(id: number): Promise<void> {
    await this.movieRepository.delete(id);
  }
}
