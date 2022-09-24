import "express-async-errors"; //unhandled promise errors
import cookieSession from "cookie-session";
import express from "express";
import { AppDataSource } from "./db/data-source";
import {
    currentUser,
    DatabaseConnectionError,
    errorHandler,
} from "@postcom/common";
import { createCommentRouter } from "./routes/new";

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
app.use(createCommentRouter);
app.all("*", () => {
    throw new Error();
});
app.use(errorHandler);
app.listen(3000, async () => {
    try {
        await AppDataSource.initialize();
    } catch (err) {
        console.error(err);
        throw new DatabaseConnectionError();
    }
    console.log("Connected to Db");
    console.log("App listening on port 3000");
});
