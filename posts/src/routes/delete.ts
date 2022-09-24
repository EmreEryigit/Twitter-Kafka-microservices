import { NotFoundError, requireAuth, UnauthorizedError } from "@postcom/common";
import express, { Request, Response, Router } from "express";
import { postRepo } from "../db/data-source";

const router = express.Router();

router.delete(
    "/api/post/:postId",
    requireAuth,
    async (req: Request, res: Response) => {
        const post = await postRepo.findOneBy({
            id: +req.params.postId,
        });
        if (!post) {
            throw new NotFoundError();
        }
        if (req.currentUser?.id !== post.userId) {
            throw new UnauthorizedError();
        }

        await postRepo.delete(post);

        res.status(204).send({});
    }
);

export {router as deletePostRouter}