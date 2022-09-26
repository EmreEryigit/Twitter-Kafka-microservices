import {
    ConsumerFactory,
    NotFoundError,
    Topics,
    UserCreatedEvent,
} from "@postcom/common";
import { postRepo } from "../db/data-source";
import { Post } from "../entities/Post.entity";
import { client } from "./client";
import { groupId } from "./groupId";

export interface CommentCreatedEvent {
    topic: Topics.CommentCreated;
    data: {
        id: number;
        postId: number;
    };
}

export class CommentCreatedConsumer extends ConsumerFactory<CommentCreatedEvent> {
    readonly topic = Topics.CommentCreated;
    constructor() {
        super(client, groupId);
    }

    async onMessage(msg: CommentCreatedEvent["data"]) {
        console.log(msg);
        const post = await postRepo.findOneBy({
            id: msg.postId,
        });
        console.log(post);

        post!.commentCount = post!.commentCount + 1;
        await postRepo.save(post as Post);
    }
}
