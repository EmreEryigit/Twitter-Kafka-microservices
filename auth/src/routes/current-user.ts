import { currentUser } from "@postcom/common";
import express, { Request, Response } from "express";

const router = express.Router();
router.get(
    "/api/user/currentuser",
    async (req: Request, res: Response) => {
        res.status(200).send({ currentUser: req.currentUser });
    }
);

/* router.get("/api/user", currentUser, async (req: Request, res: Response) => {
    const users = await userRepo.find();
    res.send({
        users,
        currentUser1: req.currentUser,
    });
}); */

export { router as currentUserRouter };
