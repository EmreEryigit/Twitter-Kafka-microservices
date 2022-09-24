import {
    NotFoundError,
    RequestValidationError,
    requireAuth,
    UnauthorizedError,
} from "@postcom/common";
import { validate } from "class-validator";
import express, { Request, Response } from "express";
import { postRepo } from "../db/data-source";
import { Post } from "../entities/Post.entity";

const router = express.Router();

router.patch(
    "/api/post/:postId",
    requireAuth,
    async (req: Request, res: Response) => {
        let post = await postRepo.findOneBy({
            id: +req.params.postId,
        });
        if (!post) {
            throw new NotFoundError();
        }

        if (req.currentUser?.id !== post.userId) {
            throw new UnauthorizedError();
        }

        post = {
            ...post,
            ...req.body,
        } as Post;
        const errors = await validate(post);
        if (errors.length > 0) {
            throw new RequestValidationError(errors);
        }
        console.log(post);
        await postRepo.save(post);
        res.status(200).send({ post });
    }
);

export { router as updateRouter };
