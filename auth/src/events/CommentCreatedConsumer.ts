import { ConsumerFactory, Topics } from "@postcom/common";
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
    }
}
