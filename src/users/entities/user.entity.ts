<<<<<<< HEAD
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm'; import { Game } from '../../games/entities/game.entity';
=======
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';import { Game } from '../../games/entities/game.entity';
>>>>>>> 231ccd866b48deea68c4b5a6e09b6b45c75f7809
import { News } from '../../news/entities/news.entity';

// On définit les rôles possibles 
export enum UserRole {
    COACH = 'coach',
    CONTRIBUTEUR = 'contributeur',
    JOUEUR = 'joueur',
<<<<<<< HEAD
    ADMIN = 'admin',
=======
>>>>>>> 231ccd866b48deea68c4b5a6e09b6b45c75f7809
}

@Entity()
export class User {
    // L'ID unique généré automatiquement
    @PrimaryGeneratedColumn()
    id: number;

    // L'email doit être unique (pas deux comptes avec le même email)
    @Column({ unique: true })
    email: string;

    // Le mot de passe sera stocké chiffré (jamais en clair), donc string
    @Column()
    password: string;

    @Column()
    firstname: string; // Prénom

    @Column()
    lastname: string;  // Nom

    // Ici on stocke le rôle. Par défaut, on dira qu'un nouveau est un "joueur".
    @Column({
        type: 'simple-enum',
        enum: UserRole,
        default: UserRole.JOUEUR
    })
    role: UserRole;

    // TypeORM gère la date automatiquement lors de la création
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ManyToMany(() => Game, (game) => game.players)
    games: Game[];

    // "Un User peut avoir Plusieurs News"
    @OneToMany(() => News, (news) => news.author)
    news: News[];
}