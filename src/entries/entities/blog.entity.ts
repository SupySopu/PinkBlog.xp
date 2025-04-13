import { Column, Entity, OneToMany } from 'typeorm';
import { Comment } from '../../comment/entities/comment.entity'; // Importar la entidad de comentarios
import BaseEntity from './base.entity';

@Entity()
export class BlogEntity extends BaseEntity {
  @Column()
  title: string;

  @Column()
  preview: string;

  @Column()
  content: string;

  @Column({ default: false })
  published: boolean;

  @Column({ type: Date, nullable: true })
  publish_at: Date | null;

  @OneToMany(() => Comment, (comment) => comment.blog) // Definir la relación
  comments: Comment[];
}