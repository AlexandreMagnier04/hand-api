import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  // La relation "author" (User) sera ajoutée à l'étape suivante
}