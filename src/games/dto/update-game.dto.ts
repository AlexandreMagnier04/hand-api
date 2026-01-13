import { PartialType } from '@nestjs/mapped-types';
import { CreateGameDto } from './create-game.dto';
import { IsInt, IsOptional, Min } from 'class-validator';

export class UpdateGameDto extends PartialType(CreateGameDto) {
  // On ajoute les scores ici car ils sont optionnels à la création mais indispensables après le match
  
  @IsOptional()
  @IsInt()
  @Min(0) // Impossible d'avoir un score négatif
  score_hcc?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  score_opponent?: number;
}