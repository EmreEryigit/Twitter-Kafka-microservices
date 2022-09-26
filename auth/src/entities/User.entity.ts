import {
    AfterInsert,
    BeforeInsert,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

import { Exclude } from "class-transformer";
import { PasswordMethods } from "../utils/Password";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @IsString()
    @Column()
    @MaxLength(35)
    @MinLength(4)
    name: string;

    @Column({
        unique: true,
    })
    @IsEmail()
    email: string;

    @Column()
    img?: string;

    @Exclude()
    @Column()
    @IsString()
    password: string;

    @BeforeInsert()
    async BeforeInsert() {
        this.password = await PasswordMethods.hashPassword(this.password);
    }

    @AfterInsert()
    logInsert() {
        console.log(this.id);
    }
}
