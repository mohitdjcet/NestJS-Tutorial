import { Entity, PrimaryGeneratedColumn,Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

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
}