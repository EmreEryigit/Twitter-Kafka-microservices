import cookieSession from "cookie-session";
import express from "express";
import "express-async-errors"; //unhandled promise errors
import { AppDataSource } from "./db/data-source";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";
import {
    currentUser,
    DatabaseConnectionError,
    errorHandler,
    NotFoundError,
} from "@postcom/common";
import { PostCreatedConsumer } from "./events/PostCreatedConsumer";
import { UserCreatedProducer } from "./events/userCreatedProducer";

const app = express();
app.set("trust proxy", true);
app.use(express.json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== "test",
    })
);
app.use(currentUser);
app.use(currentUserRouter);
app.use(signUpRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.all("*", async (req, res) => {
    throw new Error();
});
app.use(errorHandler);
app.listen(3000, async () => {
    try {
        await AppDataSource.initialize();

        await new PostCreatedConsumer().startBatchConsumer();

        console.log("Connected to Db");

        console.log("App listening on port 3000");
    } catch (err) {
        console.log(err);
        throw new DatabaseConnectionError();
    }
});
