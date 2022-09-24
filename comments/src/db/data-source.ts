import { DataSource } from "typeorm";
import { Comment } from "../entities/Comment.entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "comments-pg-srv",
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true,
    logging: false,
    entities: [Comment],
    subscribers: [],
    migrations: [],
});

export const commentRepo = AppDataSource.getRepository(Comment);
