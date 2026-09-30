import { Post } from "src/posts/post.entity";
import { Entity, PrimaryGeneratedColumn,Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";

@Entity('users')
export class User{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    name!:string;

    @Column({unique:true})
    email!: string;

    @Column({default:18,nullable:true})
    age!: number;

    @CreateDateColumn()
    createAt!: Date;

    @UpdateDateColumn()
    updatedAt!:Date;

    @OneToMany(()=> Post,(post)=> post.user)
    posts!:Post[];
}