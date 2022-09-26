import { IsString, IsUrl } from "class-validator";
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    title: string;

    @Column()
    @IsString()
    context: string;

    @Column({ nullable: true })
    img?: string;

    @Column({ nullable: false })
    userId: number;

    @Column()
    @IsString()
    userName: string

    @Column({ nullable: true, default: 0 })
    commentCount: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
