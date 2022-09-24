import { NotFoundError, requireAuth, UnauthorizedError } from "@postcom/common";
import express, { Request, Response, Router } from "express";
import { postRepo } from "../db/data-source";

const router = express.Router();

router.get("/api/post/:postId", async (req: Request, res: Response) => {
    const post = await postRepo.findOneBy({
        id: +req.params.postId,
    });
    if (!post) {
        throw new NotFoundError();
    }

    res.send({ post });
});

export {router as showRouter}
