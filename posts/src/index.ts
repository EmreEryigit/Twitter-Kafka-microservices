import "express-async-errors"; //unhandled promise errors
import cookieSession from "cookie-session";
import express from "express";
import { AppDataSource } from "./db/data-source";
import {
    asyncHandler,
    currentUser,
    DatabaseConnectionError,
    errorHandler,
} from "@postcom/common";
import { PostCreatedProducer } from "./events/PostCreatedProducer";
import { createPostRouter } from "./routes/new";
import { deletePostRouter } from "./routes/delete";
import { showAllRouter } from "./routes";
import { updateRouter } from "./routes/update";
import { showRouter } from "./routes/show";
import { CommentCreatedConsumer } from "./events/CommentCreatedConsumer";

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

app.use(createPostRouter);
app.use(deletePostRouter);
app.use(showAllRouter);
app.use(updateRouter);
app.use(showRouter);
app.all("*", () => {
    throw new Error();
});
app.use(errorHandler);
app.listen(3000, async () => {
    try {
        await new CommentCreatedConsumer().startBatchConsumer();
        await AppDataSource.initialize();
    } catch (err) {
        console.log(err);
        throw new DatabaseConnectionError();
    } finally {
        console.log("App listening on port 3000");
    }
});
