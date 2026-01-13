import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // 1. Vérifier si l'utilisateur existe et si le mot de passe est bon
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    
    // Si l'utilisateur existe ET que le mot de passe correspond au hash
    if (user && (await bcrypt.compare(pass, user.password))) {
      // On retire le mot de passe des infos qu'on garde (sécurité)
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // 2. Générer le token JWT
  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload), // Génération du token
    };
  }
}