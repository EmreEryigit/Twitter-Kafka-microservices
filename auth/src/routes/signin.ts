import express, { Request, Response } from "express";
import { userRepo } from "../db/data-source";

import { PasswordMethods } from "../utils/Password";
import jwt from "jsonwebtoken";
import { NotFoundError } from "@postcom/common";
import { plainToInstance } from "class-transformer";
import { UserDto } from "../dto/user.dto";

const router = express.Router();

router.post("/api/user/signin", async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await userRepo.findOneBy({
        email,
    });
    if (!user) {
        throw new NotFoundError();
    }
    const isValidPass = await PasswordMethods.comparePassword(
        user.password,
        password
    );

    if (!isValidPass) {
        return res.status(400).send("email or pass wrong");
    }

    const userJwt = jwt.sign(
        {
            id: user.id,
            email: user.email,
            name: user.name,
        },
        process.env.JWT_KEY!
    );

    req.session = {
        jwt: userJwt,
    };

    const tobeSent = plainToInstance(UserDto, user);
    res.status(201).send({ user: tobeSent });
});

export { router as signinRouter };
