import express, { Request, Response } from "express";
import { AppDataSource } from "../db/data-source";
import { User } from "../entities/User.entity";
import { PasswordMethods } from "../utils/Password";
import jwt from "jsonwebtoken";
import { NotFoundError } from "@postcom/common";

const router = express.Router();
const userRepo = AppDataSource.getRepository(User);
router.post("/api/user/signin", async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await userRepo.findOneBy({
        email,
    });
    if (!user) {
        throw new NotFoundError();
    }
    const isValidPass = await PasswordMethods.comparePassword(
        user.passhash,
        password
    );

    if (!isValidPass) {
        return res.status(400).send("email or pass wrong");
    }

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
    res.status(201).send({ user });
});

export { router as signinRouter };
