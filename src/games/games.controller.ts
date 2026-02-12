import { Controller, Get, Post, Body, Patch, Param, UseGuards, Request, Delete } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto'; // N'oublie pas l'import
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('games')
@UseGuards(JwtAuthGuard, RolesGuard) // Tout le monde connecté
export class GamesController {
  constructor(private readonly gamesService: GamesService) { }

  // --- CRÉATION : COACH/ADMIN SEULEMENT ---
  @Roles(UserRole.COACH, UserRole.ADMIN)
  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  // --- MODIFICATION (Score/Date) : COACH/ADMIN SEULEMENT ---
  @Roles(UserRole.COACH, UserRole.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gamesService.update(+id, updateGameDto);
  }

  // --- INSCRIPTION : JOUEUR SEULEMENT ---
  @Roles(UserRole.JOUEUR)
  @Post(':id/join')
  joinGame(@Param('id') id: string, @Request() req) {
    return this.gamesService.addPlayer(+id, req.user);
  }

  // --- INSCRIPTION MANUELLE : COACH/ADMIN SEULEMENT ---
  @Roles(UserRole.ADMIN, UserRole.COACH)
  @Post(':gameId/player/:playerId')
  addPlayerManually(
    @Param('gameId') gameId: string,
    @Param('playerId') playerId: string
  ) {
    return this.gamesService.addPlayerById(+gameId, +playerId);
  }

  // --- DÉSINCRIPTION : SEULEMENT LES JOUEURS ---
  @Roles(UserRole.JOUEUR)
  @Delete(':id/join') // Verbe DELETE, URL identique
  leaveGame(@Param('id') id: string, @Request() req) {
    return this.gamesService.removePlayer(+id, req.user);
  }

  // --- LECTURE : TOUS ---
  @Get()
  findAll() {
    return this.gamesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gamesService.findOne(+id);
  }
}