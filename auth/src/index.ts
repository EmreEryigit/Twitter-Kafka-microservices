import "express-async-errors"; //unhandled promise errors
import cookieSession from "cookie-session";
import express from "express";
import { AppDataSource } from "./db/data-source";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";
import { asyncHandler, DatabaseConnectionError, errorHandler } from "@postcom/common";


const app = express();
app.set("trust proxy", true);
app.use(express.json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== "test",
    })
);

app.use(signUpRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(currentUserRouter);

app.all(
    "*",
    asyncHandler(async () => {
        throw new Error();
    })
);
app.use(errorHandler);
app.listen(3000, async () => {
    AppDataSource.initialize()
        .then(async () => {
            /*    await producer.start().then(() => {
                console.log("Producer started");
            });

            await producer
                .sendBatch([
                    {
                        a: {
                            key: "value",
                        },
                    },
                ])
                .then(() => {
                    console.log("Producer sent batch");
                });

            await consumer.startConsumer().then(() => {
                console.log("Consumer started listening");
            }); */
            console.log("Connected to Db");
        })
        .catch(() => {
            throw new DatabaseConnectionError();
        })
        .then(async () => {
            console.log("App listening on port 3000");
        });
});
