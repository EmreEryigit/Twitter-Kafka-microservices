import { NotFoundError } from "@postcom/common";
import express, { Request, Response } from "express";
import { userRepo } from "../db/data-source";

const router = express.Router();

router.get("/api/user/:id", async (req: Request, res: Response) => {
    const user = await userRepo.findOneBy({
        id: +req.params.id,
    });
    if (!user) {
        throw new NotFoundError();
    }
    const userToBeSent = {
        id: user.id,
        email: user.email,
        name: user.name,
    };
    res.status(200).send({});
});
