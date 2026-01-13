import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // 1. On dit où chercher le token (dans le Header "Authorization: Bearer ...")
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 2. On refuse les tokens périmés
      ignoreExpiration: false,
      // 3. On doit utiliser la MÊME clé secrète que dans AuthModule
      secretOrKey: 'LA_GIGA_CLE_DE_LA_MORT_QUI_TUE', 
    });
  }

  // Ce que cette fonction retourne sera injecté dans "req.user"
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}