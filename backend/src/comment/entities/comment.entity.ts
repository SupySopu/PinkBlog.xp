import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BlogEntity } from '../../entries/entities/blog.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => BlogEntity, (blog) => blog.comments)
  blog: BlogEntity;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;
}
