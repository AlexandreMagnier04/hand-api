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
<<<<<<< HEAD
      secretOrKey: 'LA_GIGA_CLE_DE_LA_MORT_QUI_TUE',
=======
      secretOrKey: 'LA_GIGA_CLE_DE_LA_MORT_QUI_TUE', 
>>>>>>> 231ccd866b48deea68c4b5a6e09b6b45c75f7809
    });
  }

  // Ce que cette fonction retourne sera injecté dans "req.user"
  async validate(payload: any) {
<<<<<<< HEAD
    return { id: payload.sub, email: payload.email, role: payload.role };
=======
    return { userId: payload.sub, email: payload.email, role: payload.role };
>>>>>>> 231ccd866b48deea68c4b5a6e09b6b45c75f7809
  }
}