import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule], // On importe UsersModule pour pouvoir utiliser UsersService plus tard
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}