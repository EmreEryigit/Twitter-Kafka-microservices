import {
    IsBoolean,
    IsEmpty,
    IsNotEmpty,
    IsNumber,
    IsString,
    MaxLength,
    MinLength,
} from "class-validator";
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    @MinLength(5)
    @MaxLength(120)
    text: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @Column()
    @IsString()
    userName: string;

    @Column()
    @IsNumber()
    @IsNotEmpty()
    postId: number;
}
