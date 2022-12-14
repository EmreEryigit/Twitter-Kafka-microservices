import { DataSource } from "typeorm";
import { User } from "../entities/User.entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "auth-pg-srv",
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true,
    logging: false,
    entities: [User],
    subscribers: [],
    migrations: [],
});

export const userRepo = AppDataSource.getRepository(User);
