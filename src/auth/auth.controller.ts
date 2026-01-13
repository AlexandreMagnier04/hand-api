import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: any) {
    // 1. On vérifie les identifiants
    const user = await this.authService.validateUser(body.email, body.password);
    
    if (!user) {
      throw new UnauthorizedException('Identifiants incorrects');
    }

    // 2. Si c'est bon, on délivre le token
    return this.authService.login(user);
  }
}