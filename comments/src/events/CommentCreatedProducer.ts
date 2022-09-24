import { ProducerFactory, Topics } from "@postcom/common";

import { client } from "./client";

export interface CommentCreatedEvent {
    topic: Topics.CommentCreated;
    data: {
        id: number;
        postId: number;
    };
}

export class CommentCreatedProducer extends ProducerFactory<CommentCreatedEvent> {
    readonly topic = Topics.CommentCreated;
    constructor() {
        super(client);
    }
}
