import express, { Request, Response } from "express";
import { AppDataSource } from "../db/data-source";
import { User } from "../entities/User.entity";

const router = express.Router();
const userRepo = AppDataSource.getRepository(User);

router.post("/api/user/signout", async (req: Request, res: Response) => {
    req.session = null;
    res.send({});
});
export { router as signoutRouter };
