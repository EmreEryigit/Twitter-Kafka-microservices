import { validate } from "class-validator";
import express, { Request, Response } from "express";
import { userRepo } from "../db/data-source";
import { User } from "../entities/User.entity";
import jwt from "jsonwebtoken";
import {
    BadRequestError,
    currentUser,
    RequestValidationError,
} from "@postcom/common";
import { plainToClass, plainToInstance } from "class-transformer";
import { UserDto } from "../dto/user.dto";
import { UserCreatedProducer } from "../events/userCreatedProducer";

const router = express.Router();

router.post("/api/user/signup", async (req: Request, res: Response) => {
    const { email, password, name } = req.body;
    const foundUser = await userRepo.findOneBy({
        email: email,
    });
    if (foundUser) {
        throw new BadRequestError("Invalid email or password");
    }
    const user = new User();
    user.email = email;
    user.name = name;
    user.password = password;

    const errors = await validate(user);
    if (errors.length > 0) {
        console.log(errors);
        throw new RequestValidationError(errors);
    }
    await userRepo.save(user);

    const producer = new UserCreatedProducer();
    await producer.start();
    console.log("producer connected");

    await producer.sendBatch([
        {
            id: user.id,
            email: user.email,
            name: user.name,
        },
    ]);
    console.log("batch sent");

    const userJwt = jwt.sign(
        {
            id: user.id,
            email: user.email,
        },
        process.env.JWT_KEY!
    );
    req.session = {
        jwt: userJwt,
    };

    const tobeSent = plainToInstance(UserDto, user);
    res.status(201).send({ user: tobeSent });
});

/* router.get("/api/user/:id", async (req: Request, res: Response) => {
    const user = await userRepo.findOneBy({
        id: +req.params.id,
    });

    user && res.send(user);
}); */

export { router as signUpRouter };
