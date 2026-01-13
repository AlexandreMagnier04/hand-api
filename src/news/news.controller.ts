import { Controller, Post, Get, Body, UseGuards, Request, Param } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('news')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NewsController {
  constructor(private readonly newsService: NewsService) { }
  @Roles(UserRole.ADMIN, UserRole.CONTRIBUTEUR)// Seuls les contributeurs peuvent publier
  @Post()
  create(@Body() createNewsDto: CreateNewsDto, @Request() req) {
    // req.user contient l'utilisateur extrait du token JWT
    return this.newsService.create(createNewsDto, req.user);
  }

  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(+id);
  }
}