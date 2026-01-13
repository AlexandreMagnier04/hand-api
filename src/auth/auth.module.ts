import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    // Configuration du module qui va générer les tokens
    JwtModule.register({
      secret: 'LA_GIGA_CLE_DE_LA_MORT_QUI_TUE', // Clé secrète pour signer les tokens
      signOptions: { expiresIn: '1d' }, // Token valide 1 jour
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}