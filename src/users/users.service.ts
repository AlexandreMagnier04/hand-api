import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'; // L'outil de hachage

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        // 1. On vérifie si l'email existe déjà (facultatif car @Column({unique: true}) le fait, 
        // mais c'est plus propre de gérer l'erreur ici)
        const existingUser = await this.userRepository.findOne({
            where: { email: createUserDto.email }
        });

        if (existingUser) {
            throw new ConflictException('Cet email est déjà utilisé');
        }

        // 2. On hache le mot de passe (le "salt" de 10 tours est le standard)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

        // 3. On crée l'utilisateur avec le mot de passe haché
        const newUser = this.userRepository.create({
            ...createUserDto,
            password: hashedPassword, // On remplace le mot de passe clair par le haché
        });

        // 4. On sauvegarde et on retourne le résultat
        return this.userRepository.save(newUser);
    }

    // Cette méthode servira pour le Login plus tard
    async findOneByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { email } });
    }
}