import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';import { User } from '../../users/entities/user.entity';

@Entity()
export class News {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('text') // 'text' permet de stocker un contenu plus long qu'un simple string
    description: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    publicationDate: Date;


    // "Plusieurs news peuvent appartenir à Un User"
    // onDelete: 'SET NULL' signifie que si on supprime l'auteur, 
    // la news reste mais sans auteur (au lieu d'être supprimée aussi).
    @ManyToOne(() => User, (user) => user.news, { onDelete: 'SET NULL' })
    author: User;
}