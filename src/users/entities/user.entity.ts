import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Comment } from '../../comment/entities/comment.entity'; // Asegúrate de importar la entidad de comentarios

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ default: "admin" })
    rol: string;

    @OneToMany(() => Comment, comment => comment.user) // Relación uno a muchos con Comment
    comments: Comment[]; // Agregamos el array de comentarios

    @DeleteDateColumn()
    deletedAt: Date;
}