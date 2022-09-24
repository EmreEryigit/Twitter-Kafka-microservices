import { DataSource } from "typeorm";

import { Post } from "../entities/Post.entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "posts-pg-srv",
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true,
    logging: false,
    entities: [Post],
    subscribers: [],
    migrations: [],
});

export const postRepo = AppDataSource.getRepository(Post);
