import { Controller, Post, Patch, Body, Get, UseGuards, Request, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangeRoleDto } from './dto/change-role.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN) // Seuls les admins et coachs peuvent voir tous les utilisateurs
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // Seuls les admins peuvent changer les rôles
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN) // Les admins et modérateurs peuvent changer les rôles
  @Patch(':id/role')
  updateRole(@Param('id') id: string, @Body() changeRoleDto: ChangeRoleDto) {
    return this.usersService.updateRole(+id, changeRoleDto);
  }
}