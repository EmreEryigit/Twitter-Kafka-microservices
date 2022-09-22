import { IsString } from "class-validator";
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Comment } from "./Comment.entity";
import { User } from "./User.entity";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    @IsString()
    title: string;

    @Column()
    @IsString()
    context: string;

    @ManyToOne(() => User, (author) => author.posts)
    author: User;

    @OneToMany(() => Comment, (comment) => comment.post)
    comments: Comment;
}
