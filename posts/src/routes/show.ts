import { NotFoundError, requireAuth, UnauthorizedError } from "@postcom/common";
import express, { Request, Response, Router } from "express";
import { postRepo } from "../db/data-source";

const router = express.Router();

router.get("/api/post/:postId", async (req: Request, res: Response) => {
    const postId = Number(req.params.postId);
    if (!postId) {
        return res.status(400).send({});
    }
    const post = await postRepo.findOneBy({
        id: Number(req.params.postId),
    });
    if (!post) {
        throw new NotFoundError();
    }

    res.send({ post });
});

export { router as showRouter };
