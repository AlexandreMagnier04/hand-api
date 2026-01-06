import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  // CONTRAINTE 4.4 : "Il ne peut pas y avoir un match le même jour"
  // On ajoute { unique: true } pour que la BDD bloque si on essaie
  // de créer un 2ème match à la même date.
  @Column({ unique: true }) 
  date: Date;

  // CONTRAINTE 4.4 : "Un match doit contenir un adversaire"
  @Column()
  opponent: string;

  // CONTRAINTE 4.4 : "et un score final"
  // On met 'nullable: true' car au moment de la création (avant le match),
  // le score n'existe pas encore. Seul le coach le remplira après le match.
  @Column({ nullable: true })
  score_hcc: number;

  @Column({ nullable: true })
  score_opponent: number;
}