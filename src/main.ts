import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Active la validation automatique pour tous les DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Retire automatiquement les propriétés qui ne sont pas dans le DTO (sécurité)
    forbidNonWhitelisted: true, // Renvoie une erreur si on envoie une donnée interdite
  }));


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
