import { validate } from "class-validator";
import express, { Request, Response } from "express";
import { AppDataSource } from "../db/data-source";
import { User } from "../entities/User.entity";
import { PasswordMethods } from "../utils/Password";
import jwt from "jsonwebtoken";
import {
    BadRequestError,
    currentUser,
    RequestValidationError,
} from "@postcom/common";

const router = express.Router();
const userRepo = AppDataSource.getRepository(User);

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
    user.passhash = await PasswordMethods.hashPassword(password);

    const errors = await validate(user);
    if (errors.length > 0) {
        console.log(errors);
        throw new RequestValidationError(errors);
    }
    await userRepo.save(user);
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
    console.log(userJwt, req.session);

    res.status(201).send({ user });
});

router.get("/api/user", currentUser, async (req: Request, res: Response) => {
    const users = await userRepo.find();
    res.send({
        users,
        currentUser1: req.currentUser,
    });
});

/* router.get("/api/user/:id", async (req: Request, res: Response) => {
    const user = await userRepo.findOneBy({
        id: +req.params.id,
    });

    user && res.send(user);
}); */

export { router as signUpRouter };
