import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Game {
    @PrimaryGeneratedColumn()
    id: number;

    // On ajoute { unique: true } pour que la BDD bloque si on essaie de créer un 2ème match à la même date.
    @Column({ unique: true })
    date: Date;

    // "Un match doit contenir un adversaire"
    @Column()
    opponent: string;

    // On met 'nullable: true' car au moment de la création (avant le match), le score n'existe pas encore. Seul le coach le remplira après le match.
    @Column({ nullable: true })
    score_hcc: number;

    @Column({ nullable: true })
    score_opponent: number;
    
    @ManyToMany(() => User, (user) => user.games)
    @JoinTable() //  Crée la table de liaison "game_players_user"
    players: User[];
}
