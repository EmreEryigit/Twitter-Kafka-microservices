import { RequestValidationError, requireAuth } from "@postcom/common";
import { validate } from "class-validator";
import express, { Request, Response } from "express";
import { commentRepo } from "../db/data-source";
import { Comment } from "../entities/Comment.entity";
import { CommentCreatedProducer } from "../events/CommentCreatedProducer";

const router = express.Router();

router.post(
    "/api/comment/:postId",
    requireAuth,
    async (req: Request, res: Response) => {
        const { text } = req.body;

        const comment = new Comment();
        comment.postId = +req.params.postId;
        comment.text = text;
        comment.userId = req.currentUser!.id;
        comment.userName = req.currentUser!.name;
        console.log(comment);
        const errors = await validate(comment);
        if (errors.length > 0) {
            throw new RequestValidationError(errors);
        }

        await commentRepo.save(comment);
        const createdProducer = new CommentCreatedProducer();
        await createdProducer.start();
        await createdProducer
            .sendBatch([
                {
                    id: comment.id,
                    postId: comment.postId,
                },
            ])
            .then(async () => {
                console.log("batch sent");
                await createdProducer.shutdown();
            });
        res.status(201).send({ comment });
    }
);

export { router as createCommentRouter };
