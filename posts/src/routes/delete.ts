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

        const deletedPost = await postRepo.remove(post);

        res.status(204).send({deletedPost});
    }
);

export {router as deletePostRouter}
