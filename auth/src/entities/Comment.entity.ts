import { IsBoolean, IsString, MaxLength, MinLength } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post.entity";
import { User } from "./User.entity";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    @IsString()
    @MinLength(5)
    @MaxLength(120)
    text: string;

    @Column()
    @IsBoolean()
    isRecommended: boolean;

    @ManyToOne(() => User, (author) => author.comments)
    author: User;

    @ManyToOne(() => Post, (post) => post.comments)
    post: Post;
}
