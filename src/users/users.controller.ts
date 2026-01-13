import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register') // L'URL sera : POST /users/register
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  
  @UseGuards(JwtAuthGuard) // Protection de la route avec le guard JWT
  @Get('profile')
  getProfile(@Request() req) {
    // Si on arrive ici, c'est que le token est valide
    return req.user; 
  }
}