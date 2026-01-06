import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// 1. On définit les rôles possibles (Best practice : utiliser une Enum)
export enum UserRole {
  COACH = 'coach',
  CONTRIBUTEUR = 'contributeur',
  JOUEUR = 'joueur',
}

@Entity()
export class User {
  // L'ID unique généré automatiquement (1, 2, 3...)
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
}