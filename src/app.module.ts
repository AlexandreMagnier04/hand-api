import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GamesModule } from './games/games.module';
import { NewsModule } from './news/news.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity';
import { Game } from './games/entities/game.entity';
import { News } from './news/entities/news.entity';

@Module({
  imports: [
    // 1. Configuration de la Base de Données
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite', // Le nom du fichier qui sera créé
      entities: [User, Game, News], // On liste nos entités ici
      synchronize: true, // CRUCIAL : Crée la BDD automatiquement au démarrage
      logging: true, // Affiche le SQL dans la console (pratique pour voir ce qui se passe)
    }),
    
    // 2. Import des fonctionnalités
    UsersModule,
    GamesModule,
    NewsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}