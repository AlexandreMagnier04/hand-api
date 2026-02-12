import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateGameDto {
  @IsNotEmpty()
  @IsDateString() // Vérifie que c'est une date au format YYYY-MM-DD
  date: Date;

  @IsString()
  @IsNotEmpty()
  opponent: string;
}