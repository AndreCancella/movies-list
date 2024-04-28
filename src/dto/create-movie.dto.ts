// src/dto/create-movie.dto.ts

import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  @IsNotEmpty()
  year: number;
}
