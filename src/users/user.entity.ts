import { Entity, PrimaryGeneratedColumn,Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    name!:string;

    @Column({unique:true})
    email!: string;

    @Column({select:false, nullable:true})
    password!: string;
}