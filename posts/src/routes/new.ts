import { RequestValidationError, requireAuth } from "@postcom/common";
import { validate } from "class-validator";
import express, { Request, Response } from "express";
import { postRepo } from "../db/data-source";
import { Post } from "../entities/Post.entity";
import { PostCreatedProducer } from "../events/PostCreatedProducer";

const router = express.Router();

router.post("/api/post", requireAuth, async (req: Request, res: Response) => {
    const { title, context, img } = req.body;
    const post = new Post();
    post.context = context;
    post.title = title;
    if (img) {
        post.img = img;
    }
    post.userId = req.currentUser!.id;
    const errors = await validate(post);
    if (errors.length > 0) {
        throw new RequestValidationError(errors);
    }
    await postRepo.save(post);
    const producer = new PostCreatedProducer();
    await producer.start();

    await producer.sendBatch([
        {
            userId: post.userId,
            id: post.id,
            title: post.title,
        },
    ]);

    res.status(201).send({ post });
});

export { router as createPostRouter };