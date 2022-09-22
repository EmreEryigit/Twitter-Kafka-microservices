import {
    AfterInsert,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";
import { Post } from "./Post.entity";
import { Comment } from "./Comment.entity";
import { Exclude } from "class-transformer";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    @MaxLength(35)
    @MinLength(4)
    name: string;

    @Column()
    @IsEmail()
    email: string;

    @Exclude()
    @Column()
    @IsString()
    passhash: string;

    @OneToMany(() => Post, (post) => post.author)
    posts: Post[];

    @OneToMany(() => Comment, (comment) => comment.author)
    comments: Comment[];

    @AfterInsert()
    logInsert() {
        console.log(this.id);
    }
}
