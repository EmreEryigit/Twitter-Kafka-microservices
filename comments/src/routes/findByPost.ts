import { NotFoundError } from "@postcom/common";
import express, { Request, Response } from "express";
import { commentRepo } from "../db/data-source";

const router = express.Router();

router.get("/api/comment/:postId", async (req: Request, res: Response) => {
    const postId = Number(req.params.postId);
    if (!postId ) {
        return res.status(400).send({});
    }

    const postComments = await commentRepo.findBy({
        postId: Number(req.params.postId),
    });

    if (postComments.length === 0) {
        throw new NotFoundError();
    }
    res.send({ postComments });
});
export { router as findByPostRouter };
