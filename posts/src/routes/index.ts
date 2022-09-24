import express, { Request, Response } from "express";
import { postRepo } from "../db/data-source";

const router = express.Router();

router.get("/api/post", async (req: Request, res: Response) => {
    const posts = await postRepo.find();
    res.send({posts});
});
export {router as showAllRouter}