import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsEmail({}, { message: "L'email n'est pas valide" })
  email: string;

  @MinLength(6, { message: 'Le mot de passe doit faire au moins 6 caractères' })
  password: string;
}