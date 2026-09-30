import { User } from "src/users/user.entity";
import { Entity, PrimaryGeneratedColumn,Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity('posts')
export class Post{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    title!:string;

    @Column()
    content!: string;

    @CreateDateColumn()
    createAt!: Date;

    @UpdateDateColumn()
    updatedAt!:Date;

    @ManyToOne(()=> User,(user)=> user.posts)
    @JoinColumn({ name:"userId"})
    user!:User;
}